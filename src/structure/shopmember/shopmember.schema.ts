import { IShopMemberModel } from './shopmember.interface';
import { Schema, model, Model } from 'mongoose';
import { ObjectId } from '../../datatypes';

const ShopMemberSchema: Schema = new Schema({
    name: String,
    phoneNumber: [{type:String}],
    role: {type: String, enum: ['owner','coOwner', 'worker'] },
    shopId: {type: {_id:ObjectId, ref: 'shop'}},
    permission: {_id:ObjectId, ref:'permissions'},
    photo: {_id: ObjectId, ref: 'photo'}
});

ShopMemberSchema.methods.addMember = async function() {
    return this.save();
}

export const ShopMember: Model<IShopMemberModel> = model<IShopMemberModel>('shopMember', ShopMemberSchema);