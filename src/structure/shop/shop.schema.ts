import { HTTP400Error } from './../../lib/utils/httpErrors';
import { Schema, Model, model } from 'mongoose';
import { IShopModel } from './shop.interface';

const ObjectID = Schema.Types.ObjectId;
export const ShopSchema: Schema = new Schema({
    shopName: {
        type: String,
        required: true,
    },
    ownerPhoneNumber: {
        type: String,
        required: true,
        unique:true
    },
    ownerName: {
        type:String,
        required: true
    },
    addressOfShop: {
        type: String,
        required: true,
    },
    owner:  [{type: ObjectID, ref:'ShopMember'}],
    coOwner:  [{type: ObjectID, ref:'ShopMember' }],
    worker: [{type:ObjectID, ref:'ShopMember'  }],
    isAuthenticated: {type: Boolean, default:false },
    isTerminated: {type: Boolean, default:false },
},{
    timestamps: true
});

ShopSchema.methods.addNewShop = async function () {
    return this.save();
};

ShopSchema.statics.shopExist = async function (id) {
    const shop = await this.findOne({_id:id});
    if(!shop) {
        throw new HTTP400Error("Shop does not exist");
    } else {
        return shop
    }
}

export const Shop: Model<IShopModel> = model<IShopModel>('shop', ShopSchema);
