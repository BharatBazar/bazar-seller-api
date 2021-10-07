import { shop_message } from './../../lib/helpers/customMessage';
import { paginationConfig } from './../../config/index';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { ObjectId, Types } from 'mongoose';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';
import { pruneFields } from '../../lib/helpers';
import ShopMemberModel from '../shopmember/shopmember.model';

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

    public shopVerificationDetails = async (body: IShopModel) => {
        const shop: IShopModel | null = await Shop.findOne({ _id: body._id }, 'isVerified verificationStatus remarks');

        if (shop) {
            return shop;
        } else {
            throw new HTTP400Error('Shop does not exist');
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

            const populateString =
                subCategory.join(' ') + subCategory1.join(' ') + ' category' + ' coOwner owner worker state city area';
            console.log('populate string', typeof populateString, populateString);

            const populatedShop = await Shop.findById(body._id).populate(populateString);

            pruneFields(populatedShop, 'password');
            return populatedShop;
        } else throw new HTTP400Error('Shop does not exist');
    };

    public updateShop = async (data: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: data._id });

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

    public deleteShop = async (data: { _id: Types.ObjectId }) => {
        try {
            console.log(data);
            data._id = new Types.ObjectId(data._id);
            const shop = await Shop.findOne({ _id: data._id });
            console.log('shop =>', shop);
            if (shop) {
                const deleteMember = [];
                deleteMember.push(
                    new Promise(async (resolve) => {
                        resolve(await ShopMemberModel.deleteMember({ _id: shop.owner }));
                    }),
                );
                shop.coOwner.forEach((member) => {
                    deleteMember.push(
                        new Promise(async (resolve) => {
                            resolve(await ShopMemberModel.deleteMember({ _id: member }));
                        }),
                    );
                });
                shop.worker.forEach((member) => {
                    deleteMember.push(
                        new Promise(async (resolve) => {
                            resolve(await ShopMemberModel.deleteMember({ _id: member }));
                        }),
                    );
                });

                console.log(deleteMember.length, deleteMember);

                await Promise.all([...deleteMember, await Shop.findByIdAndDelete(data._id)]);
                return 'Shop deleted';
            } else {
                throw new HTTP400Error('Shop does not exist!!');
            }
        } catch (error) {
            throw new Error('Error in removing dukan from market');
        }
    };

    public updateShopCategory = async (body: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: body._id });
        if (shop) {
        } else {
            throw new HTTP400Error(shop_message.NO_SHOP);
        }
    };

    public searchShopByName = async (shopName: string) => {
        const searchCount = await Shop.countDocuments({ shopName: { $regex: shopName, $options: 'i' } });
        console.log(searchCount, shopName);
        const data =
            searchCount > 0
                ? await Shop.find({ shopName: { $regex: shopName, $options: 'i' } })
                      .select('_id shopName')
                      .limit(10)
                : [];
        console.log(data);
        return data;
    };

    public getAllShop = async (query: { query: any; selectString: string }) => {
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
                      .select(
                          query.selectString
                              ? query.selectString
                              : 'createdAt verificationStatus shopName addressOfShop localAddress shopImage ',
                      )
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
