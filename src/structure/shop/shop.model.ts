import { shop_message } from './../../lib/helpers/customMessage';
import { paginationConfig } from './../../config/index';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { ObjectId } from 'mongoose';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';
import { pruneFields } from '../../lib/helpers';

export class ShopModel {
    public createShop = async (body: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ ownerPhoneNumber: body.ownerPhoneNumber });
        if (shop) {
            if (shop.isVerified) {
                return { message: shop_message.AUTHENTICATED };
            } else {
                throw new HTTP400Error(shop_message.NOT_AUTHENTICATED);
            }
        } else {
            const data: IShopModel = await shop.addNewShop();
            return data;
        }
    };

    public getShop = async (body: { _id: ObjectId }) => {
        const shop: IShopModel | null = await Shop.findById(body._id);

        const subCategory = [];
        const subCategory1 = [];

        if (shop) {
            for (let i = 0; i < shop.subCategory.length; i++) {
                subCategory.push(`subCategory.${i} `); // Don't delete the last space !
            }
            for (let i = 0; i < shop.subCategory1.length; i++) {
                for (let t = 0; t < shop.subCategory1[i].length; t++) {
                    subCategory1.push(`subCategory1.${i}.${t}`); // Don't delete the last space !
                }
            }

            const populateString = subCategory.join(' ') + subCategory1.join(' ') + ' category';
            console.log('populate string', typeof populateString, populateString);

            const populatedShop = await Shop.findById(body._id).populate(populateString);

            pruneFields(populatedShop, 'password');
            return populatedShop;
        } else throw new HTTP400Error('Shop does not exist');
    };

    public updateShop = async (data: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: data._id });
        console.log(shop, data);
        if (shop) {
            // let shopDetails: UpdateQuery<IShopModel> = {};
            // if (data.category) {
            //     shopDetails['$push'] = { category: { $each: data.category } };
            //     pruneFields(data, 'category');
            // }
            // // if (data.subCategory) {
            // //     shopDetails['$push'] = { subCategory: { $each: data.subCategory } };
            // // }
            // // if (data.subCategory1) {
            // //     shopDetails['$push'] = { subCategory1: { $each: data.subCategory1 } };
            // // }

            // shopDetails = { ...shopDetails, ...data };
            // console.log(shopDetails);

            return await Shop.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            throw new HTTP400Error(shop_message.NO_SHOP);
        }
    };

    public updateShopCategory = async (body: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: body._id });
        if (shop) {
        } else {
            throw new HTTP400Error(shop_message.NO_SHOP);
        }
    };

    public getAllShop = async (query: any) => {
        if (!query.query) {
            throw new HTTP400Error('No query available');
        }

        let condition: any = {};
        if (query.lastTime) {
            const dateObj = new Date(parseInt(query.lastTime, 10));
            condition.createdAt = { $lt: dateObj };
        }

        const searchCount = await Shop.countDocuments({ $and: [query.query, condition] });

        const data =
            searchCount > 0
                ? await Shop.find({ $and: [condition, query.query] })
                      .sort('-createdAt')
                      .limit(paginationConfig.MAX_SHOP)
                : [];

        const lastTime = data.length > 0 ? data[data.length - 1].createdAt.getTime() : undefined;

        return {
            payload: data,
            searchCount,
            lastTime,
            maxCount: paginationConfig.MAX_SHOP,
        };
    };
}

export default new ShopModel();
