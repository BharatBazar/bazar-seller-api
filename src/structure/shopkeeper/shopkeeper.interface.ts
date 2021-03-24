import { Document, ObjectId, Schema } from 'mongoose';

interface ShopKeeper {
    shopName: string;
    addressOfShop: string;
    shopImage: [{_id:ObjectId }];
    ownerImage: [{_id:ObjectId }];
    whatYouSell: string[];
    owner: [{_id:ObjectId }];
    coOwner: [{_id:ObjectId}];
    worker:[{_id:ObjectId}];
    isAuthenticated: boolean;
    isTerminated: boolean;
}

export const ShopKeeperFields = {
    
    shopName: 'shopName',
    addressOfShop: 'addressOfShop',
    shopPhoto: 'shopPhoto',
    ownerPhoto: 'ownerPhoto',
    whatYouSell: 'whatYouSell',
    owner: 'owner',
    coOwner: 'coOwner',
    worker: 'worker'
};

export interface IShopKeeperModel extends ShopKeeper, Document {
    addNewShopKeeper(): { _id: ObjectId };
}
