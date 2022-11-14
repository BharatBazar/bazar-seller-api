import { ObjectId } from './../../datatypes/index';
import { Schema, Model, model, Types } from 'mongoose';
import { IShopModel, verificationStatus } from './shop.interface';

type stringNum = { [key: String]: Number };

export const ShopSchema: Schema = new Schema(
    {
        shopName: {
            type: String,
        },
        shopDescription: {
            type: String,
        },
        localAddress: {
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
        //TODO: change pincode every where to id
        pincode: {
            type: String,
        },
        googleLocation: {
            type: String,
        },

        owner: { type: Types.ObjectId, ref: 'ShopMember', unique: true },
        coOwner: [{ type: Types.ObjectId, ref: 'ShopMember' }],
        worker: [{ type: Types.ObjectId, ref: 'ShopMember' }],

        membersDetailSkipped: { type: Boolean, default: false },
        shopMemberOnBoardingDone: { type: Boolean, default: false },

        isVerified: { type: Boolean, default: false },
        verificationStatus: { type: String, enum: verificationStatus, default: verificationStatus.registered },
        remarks: { type: String, default: '' },

        isTerminated: { type: Boolean, default: false },
        rating: Number,
        numberOfRating: Number,

        sellingItems: [{ type: Types.ObjectId, ref: 'ProductCatalogue' }],

        //Here key is parent id that is catalogue id and value is total filter added up to now
        filterProvidedForSellingItems: { type: Object, default: {} },
        // subCategory: [[{ type: Types.ObjectId, ref: 'ProductCatalogue' }]],
        // subCategory1: [[[{ type: Types.ObjectId, ref: 'ProductCatalogue' }]]],

        // All the filter type which is unique property for a filter has to be added here
        // As we need to do indexing so we need to give name in index what exactly it is

        // I am adding here this properties so that we can directly find shop
        // if somebody tries to filter

        mens_footwear_sneaker_brand: { type: [Types.ObjectId], ref: 'FilterValues' },
        mens_footwear_sneaker_color: { type: [Types.ObjectId], ref: 'FilterValues' },
        mens_footwear_sneaker_size: { type: [Types.ObjectId], ref: 'FilterValues' },
        mens_jeans_color: { type: [Types.ObjectId], ref: 'FilterValues' },
        means_jeans_size: { type: [Types.ObjectId], ref: 'FilterValues' },
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
