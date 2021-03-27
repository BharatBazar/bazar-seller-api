import { Document, ObjectId, Schema } from 'mongoose';

interface Shop {
    shopName: string;
    addressOfShop: string;
    // shopImage: [{_id:ObjectId }];
    // ownerImage: [{_id:ObjectId }];
    // whatYouSell: string[];
    owner: string[];
    coOwner: string[];
    worker:string[];
    isAuthenticated: boolean;
    isTerminated: boolean;
    ownerPhoneNumber:string;
    ownerName:string;
}

export const ShopFields = {
    
    shopName: 'shopName',
    addressOfShop: 'addressOfShop',
    shopPhoto: 'shopPhoto',
    ownerPhoto: 'ownerPhoto',
    whatYouSell: 'whatYouSell',
    owner: 'owner',
    coOwner: 'coOwner',
    worker: 'worker'
};

export interface IShopModel extends Shop, Document {
    addNewShop(): IShopModel;
    static shopExist(): IShopModel | null;
}
