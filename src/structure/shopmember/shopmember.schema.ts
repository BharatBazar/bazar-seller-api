import { IShopMemberModel } from './shopmember.interface';
import { Schema, model, Model } from 'mongoose';

const { ObjectId } = Schema.Types;

const ShopMemberSchema: Schema = new Schema({
    name: String,
    phoneNumber: {type: String, require:true, unique:true},
    role: {type: String, enum: ['owner','coOwner', 'worker'] },
    shop: {type:ObjectId, ref: 'shop'},
    permissions: {type:ObjectId, ref:'Permission'},//Warning give reference inside type not as direct object as it throws error
    // photo: {_id: ObjectId, ref: 'photo'}
});

ShopMemberSchema.methods.addMember = async function() {
    return this.save();
}

export const ShopMember: Model<IShopMemberModel> = model<IShopMemberModel>('ShopMember', ShopMemberSchema);