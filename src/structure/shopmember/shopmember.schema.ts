import { IShopMemberModel } from './shopmember.interface';
import { Schema, model, Model } from 'mongoose';

const { ObjectId } = Schema.Types;

const ShopMemberSchema: Schema = new Schema({
    name: String,
    phoneNumber: [{type:String}],
    role: {type: String, enum: ['owner','coOwner', 'worker'] },
    shopId: {type: {_id:ObjectId, ref: 'shop'}},
    // permission: {_id:ObjectId, ref:'permission'},
    // photo: {_id: ObjectId, ref: 'photo'}
});

ShopMemberSchema.methods.addMember = async function() {
    return (await this.save()).populate("owner").populate("coOwner").populate("worker");
}

export const ShopMember: Model<IShopMemberModel> = model<IShopMemberModel>('ShopMember', ShopMemberSchema);