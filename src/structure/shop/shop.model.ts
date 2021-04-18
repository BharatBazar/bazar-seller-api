import { shop_message } from './../../lib/helpers/customMessage';
import { paginationConfig } from './../../config/index';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { Types, ObjectId } from 'mongoose';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';

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
        console.log('Get shop', body);
        const shop: IShopModel | null = await Shop.findOne({ _id: body._id }).populate({
            path: 'owner Co-owner worker category',
            populate: {
                path: 'permissions',
            },
        });
        //Password need to be removed
        delete shop['password'];
        if (shop) return shop;
        else throw new HTTP400Error('Shop does not exist');
    };

    public updateShop = async (body: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: body._id });
        if (shop) {
            if (body.subCategory) {
                body.subCategory = body.subCategory.map((item) => item.map((item) => Types.ObjectId(item)));
            }
            if (body.subCategory1) {
                body.subCategory1 = body.subCategory1.map((item) => item.map((item) => Types.ObjectId(item)));
            }
            return await Shop.findByIdAndUpdate({ _id: body._id }, body, { new: true });
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
