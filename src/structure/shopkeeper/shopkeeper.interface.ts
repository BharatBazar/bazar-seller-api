import { Document, Schema } from 'mongoose';

interface ShopKeeper {
    phoneNumber: string;
    shopName: string;
    addressOfShop: string;
    shopImage: string[];
    ownerImage: string[];
    whatYouSell: string[];
}

export const ShopKeeperFields = {
    phoneNumber: 'phoneNumber',
    shopName: 'shopName',
    addressOfShop: 'addressOfShop',
    shopPhoto: 'shopPhoto',
    ownerPhoto: 'ownerPhoto',
    whatYouSell: 'whatYouSell',
};

export interface ShopKeeperModel extends ShopKeeper, Document {
    addNewShopKeeper(): { _id: Schema.Types.ObjectId };
}
