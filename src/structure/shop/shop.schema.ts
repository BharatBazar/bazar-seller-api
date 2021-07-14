import { ObjectId } from './../../datatypes/index';
import { Schema, Model, model, Types } from 'mongoose';
import { IShopModel, verificationStatus } from './shop.interface';

export const ShopSchema: Schema = new Schema(
    {
        shopName: {
            type: String,
        },
        shopDescription: {
            type: String,
        },
        state: {
            type: Types.ObjectId,
            ref: 'Address',
        },
        city: {
            type: Types.ObjectId,
            ref: 'Address',
        },
        area: {
            type: Types.ObjectId,
            ref: 'Address',
        },
        pincode: {
            type: String,
        },
        localAddress: {
            type: String,
        },
        googleLocation: {
            type: String,
        },

        membersDetailSkipped: { type: Boolean, default: false },
        owner: { type: Types.ObjectId, ref: 'ShopMember', unique: true },
        coOwner: [{ type: Types.ObjectId, ref: 'ShopMember' }],
        worker: [{ type: Types.ObjectId, ref: 'ShopMember' }],
        isVerified: { type: Boolean, default: false },
        verificationStatus: { type: String, enum: verificationStatus, default: verificationStatus.registered },
        remarks: { type: String, default: '' },

        isTerminated: { type: Boolean, default: false },
        rating: Number,
        numberOfRating: Number,
        category: [{ type: Types.ObjectId, ref: 'ProductCatalogue' }],
        subCategory: [[{ type: Types.ObjectId, ref: 'ProductCatalogue' }]],
        subCategory1: [[[{ type: Types.ObjectId, ref: 'ProductCatalogue' }]]],
    },
    {
        timestamps: true,
    },
);

ShopSchema.methods.addNewShop = async function () {
    return this.save();
};

ShopSchema.statics.shopExist = async function (condition) {
    return await this.findOne(condition);
};

export const Shop: Model<IShopModel> = model<IShopModel>('Shop', ShopSchema);
