import { Schema, Model, model, Mongoose } from 'mongoose';
import { ShopKeeperModel, ShopKeeperFields } from './shopkeeper.interface';
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
        type: [String],
        required: true,
    },
    addressOfShop: {
        type: String,
        required: true,
    },
    whatYouSell: [{ type: Schema.Types.ObjectId, ref: 'whatYouSell' }],
});

ShopKeeperSchema.methods.addNewShopKeeper = async function () {
    return this.save();
};

export const ShopKeeper: Model<ShopKeeperModel> = model<ShopKeeperModel>('ShopKeeper', ShopKeeperSchema);
