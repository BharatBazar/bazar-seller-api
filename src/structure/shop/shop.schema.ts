import { Schema, Model, model } from 'mongoose';
import { IShopModel } from './shopinterface';

const{ ObjectId } = Schema.Types;
export const ShopSchema: Schema = new Schema({
    shopName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    shopImage: {
        type: [{_id: String}],
        required: true,
    },
    addressOfShop: {
        type: String,
        required: true,
    },
    whatYouSell: [{ type: ObjectId, ref: 'whatYouSell' }],
    owner: [{type:ObjectId, ref:'shopMember'  }],
    coOwner: [{type:ObjectId, ref:'shopMember'  }],
    worker: [{type:ObjectId, ref:'worker'  }],
    isAuthenticated: {type: Boolean },
    isTerminated: {type: Boolean }
});

ShopSchema.methods.addNewShop = async function () {
    return this.save();
};

export const Shop: Model<IShopModel> = model<IShopModel>('shop', ShopSchema);
