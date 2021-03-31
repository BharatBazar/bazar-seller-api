import { Schema, Model, model } from 'mongoose';
import { IShopModel } from './shop.interface';

const ObjectID = Schema.Types.ObjectId;
export const ShopSchema: Schema = new Schema(
    {
        shopName: {
            type: String,
        },
        addressOfShop: {
            type: String,
        },
        memberDetaisSkipped: { type: Boolean, default: false },
        owner: { type: ObjectID, ref: 'ShopMember' },
        coOwner: [{ type: ObjectID, ref: 'ShopMember' }],
        worker: [{ type: ObjectID, ref: 'ShopMember' }],
        isVerified: { type: Boolean, default: false },
        isTerminated: { type: Boolean, default: false },
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

export const Shop: Model<IShopModel> = model<IShopModel>('shop', ShopSchema);
