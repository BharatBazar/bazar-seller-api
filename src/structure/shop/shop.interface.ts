import { Document, ObjectId, Schema, Types } from 'mongoose';

interface Shop {
    shopName: string;
    addressOfShop: string;
    // shopImage: [{_id:ObjectId }];
    // ownerImage: [{_id:ObjectId }];
    // whatYouSell: string[];
    owner: Types.ObjectId;
    coOwner: Types.ObjectId[];
    worker: Types.ObjectId[];
    isVerified: boolean;
    isTerminated: boolean;
    ownerPhoneNumber: string;
    ownerName: string;
    ownerEmail: string;
}

export const ShopFields = {
    shopName: 'shopName',
    addressOfShop: 'addressOfShop',
    shopPhoto: 'shopPhoto',
    ownerPhoto: 'ownerPhoto',
    whatYouSell: 'whatYouSell',
    owner: 'owner',
    coOwner: 'Co-owner',
    worker: 'worker',
};

export interface IShopModel extends Shop, Document {
    addNewShop(): IShopModel;
    shopExist(): IShopModel | null;
}
