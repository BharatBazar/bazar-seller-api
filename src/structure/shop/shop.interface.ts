import { Document, ObjectId, Schema, Types } from 'mongoose';

export enum verificationStatus {
    registered = 'Registered',
    processing = 'Processing',
    rejected = 'Rejected',
    verified = 'Verified',
}
interface Shop {
    shopName: string;
    shopDescription: string;
    addressOfShop: string;
    shopImage: [{ _id: ObjectId }];
    ownerImage: [{ _id: ObjectId }];
    verificationStatus: verificationStatus;
    remarks: string;
    // whatYouSell: string[];

    state: Types.ObjectId;
    city: Types.ObjectId;
    area: Types.ObjectId;
    pincode: Types.ObjectId;
    localAddress: string;

    owner: Types.ObjectId;
    coOwner: Types.ObjectId[];
    worker: Types.ObjectId[];

    isVerified: boolean;
    isTerminated: boolean;
    membersDetailSkipped: boolean;
    rating: Number;
    noOfRating: Number;
    category: [Types.ObjectId];
    subCategory: [[Types.ObjectId]];
    subCategory1: [[[Types.ObjectId]]];
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
