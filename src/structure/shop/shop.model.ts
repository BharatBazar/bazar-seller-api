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

        if (shop) {
            const populateString = 'sellingItems' + ' coOwner owner worker state city area';
            console.log('populate string', typeof populateString, populateString);

            const populatedShop = await Shop.findById(body._id).populate({
                path: populateString,
                select: 'name image type firstName lastName gender email phoneNumber role permissions',
                populate: {
                    path: 'path',
                    select: 'name ',
                },
            });
            console.log('popu', populatedShop);

            pruneFields(populatedShop, 'password');
            return populatedShop;
        } else throw new HTTP400Error('Shop does not exist');
    };

    public getShopCatalogueDetails = async (body: { _id: ObjectId }) => {
        const shop: IShopModel | null = await Shop.findById(body._id)
            .select('sellingItems')
            .populate({
                path: 'sellingItems',

                populate: {
                    path: 'path',
                },
            });
        console.log('se', shop, 'gett Catalogue');
        if (shop) {
            if (shop.sellingItems.length > 0) {
                let biggestArrayIndex = 0;
                let maxPathlength = 0;

                for (let i = 0; i < shop.sellingItems.length; i++) {
                    let item = shop.sellingItems[i];
                    console.log(item);
                    if (item.path.length > maxPathlength) {
                        biggestArrayIndex = i;
                        maxPathlength = item.path.length;
                    }
                }

                let biggestPath = shop.sellingItems[biggestArrayIndex].path;

                let selectedCategory = biggestPath.map((item, index) => {
                    return shop.sellingItems.map((cataegory) =>
                        index < cataegory.path.length ? cataegory.path[index]._id : cataegory._id,
                    );
                });

                return { sellingItems: shop.sellingItems, selectedCategory };
            }
            return { sellingItems: shop.sellingItems, selectedCategory: [] };
        } else throw new HTTP400Error('Shop does not exist');
    };

    public updateShopCatalogue = async (body: IShopModel) => {
        if (!body._id) {
            throw new HTTP400Error('Please provide shop id.');
        } else {
            const shop: IShopModel = await Shop.findByIdAndUpdate({ _id: body._id }, body, { new: true })
                .populate('sellingItems')
                .select('sellingItems');

            let newSellingItemFilterProvideList = { ...shop.filterProvidedForSellingItems };

            for (let i = 0; i < shop.sellingItems.length; i++) {
                if (newSellingItemFilterProvideList[shop.sellingItems[i]] == undefined)
                    newSellingItemFilterProvideList[shop.sellingItems[i]] = false;
            }
            await Shop.findByIdAndUpdate(
                { _id: body._id },
                { filterProvidedForSellingItems: newSellingItemFilterProvideList },
            );

            console.log('body', body, shop);
            if (shop) {
                return shop;
            } else {
                throw new HTTP400Error(shop_message.NO_SHOP);
            }
        }
    };

    public updateShop = async (data: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: data._id });

        if (shop) {
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

    // Method to save filter values in the shop
    public saveFilterValuesForShop = async (data: { [key: string]: string[] } & { _id: string }) => {
        if (data._id) {
            const updateShop = await Shop.findByIdAndUpdate(data._id, data);
            if (updateShop) {
                return { message: 'Shop filter updated' };
            } else {
                throw new HTTP400Error('Shop Not Found');
            }
        } else {
            throw new Error('Please provide shop id');
        }
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
