import { shop_message } from './../../lib/helpers/customMessage';
import { paginationConfig } from './../../config/index';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { Types, ObjectId, UpdateQuery } from 'mongoose';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';
import e from 'express';
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
        console.log('Get shop', body);
        const shop: IShopModel | null = await Shop.findOne({ _id: body._id }).populate({
            path: 'owner Co-owner worker category',
            populate: {
                path: 'permissions',
            },
        });

        if (shop) {
            pruneFields(shop, 'password');
            return shop;
        } else throw new HTTP400Error('Shop does not exist');
    };

    public updateShop = async (data: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: data._id });

        if (shop) {
            // let shopDetails: UpdateQuery<IShopModel> = {};

            // if (data.subCategory) {
            //     shopDetails['$push'] = { subCategory: { $each: data.subCategory } };
            // }
            // if (data.subCategory1) {
            //     shopDetails['$push'] = { subCategory1: { $each: data.subCategory1 } };
            // }

            // shopDetails = { ...data, ...shopDetails };

            return await Shop.findByIdAndUpdate({ _id: data._id }, data, { new: true });
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
