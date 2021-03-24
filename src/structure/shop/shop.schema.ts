import { Schema, Model, model } from 'mongoose';
import { IShopModel } from './shop.interface';

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
    // shopImage: {
    //     type: [{_id: String}],
    //     required: true,
    // },
    addressOfShop: {
        type: String,
        required: true,
    },
    // whatYouSell: [{ type: ObjectId, ref: 'whatYouSell' }],
    owner: [{type:ObjectId, ref:'ShopMember'  }],
    coOwner: [{type:ObjectId, ref:'ShopMember'  }],
    worker: [{type:ObjectId, ref:'ShopMember'  }],
    isAuthenticated: {type: Boolean },
    isTerminated: {type: Boolean }
});

ShopSchema.methods.addNewShop = async function () {
    return this.save();
};

export const Shop: Model<IShopModel> = model<IShopModel>('shop', ShopSchema);
