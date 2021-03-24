import { Schema, Model, model } from 'mongoose';
import { ObjectId } from '../../datatypes';
import { IShopKeeperModel } from './shopkeeper.interface';
export const ShopKeeperSchema: Schema = new Schema({
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

ShopKeeperSchema.methods.addNewShopKeeper = async function () {
    return this.save();
};

export const ShopKeeper: Model<IShopKeeperModel> = model<IShopKeeperModel>('shopKeeper', ShopKeeperSchema);
