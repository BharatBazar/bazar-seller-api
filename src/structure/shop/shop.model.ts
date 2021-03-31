import { shop_message } from './../../lib/helpers/customMessage';
import { paginationConfig } from './../../config/index';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { shopMemberInterface, IShopMemberModel } from './../shopmember/shopmember.interface';
import ShopMemberModel from './../shopmember/shopmember.model';
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
            const shop: IShopModel = new Shop(body);
            const shopMember: Partial<shopMemberInterface> = {
                shop: shop._id,
                name: shop.ownerName,
                phoneNumber: shop.ownerPhoneNumber,
                role: 'owner',
            };
            const ownerId = await ShopMemberModel.createShopMember(shopMember);
            shop.owner.push(ownerId);
            const data: IShopModel = await shop.addNewShop();
            return data;
        }
    };

    public getShop = async (body: { _id: ObjectId }) => {
        const shop: IShopModel | null = await Shop.findOne({ _id: body._id }).populate({
            path: 'owner coOwner worker',
            populate: {
                path: 'permissions',
            },
        });
        if (shop) return shop;
        else throw new HTTP400Error('Shop does not exist');
    };

    public updateShop = async (body: IShopModel) => {
        const shop: IShopModel = await Shop.shopExist({ _id: body._id });
        if (shop) {
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
