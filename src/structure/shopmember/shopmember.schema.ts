import { SALT_ROUNDS } from './../../config/index';
import { IShopMemberModel } from './shopmember.interface';
import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
const { ObjectId } = Schema.Types;

const ShopMemberSchema: Schema = new Schema({
    name: String,
    phoneNumber: { type: String, require: true, unique: true },
    role: { type: String, enum: ['owner', 'coOwner', 'worker'] },
    shop: { type: ObjectId, ref: 'shop' },
    permissions: { type: ObjectId, ref: 'Permission' }, //Warning give reference inside type not as direct object as it throws error
    password: String,
    email: String,
    isTerminated: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    // photo: {_id: ObjectId, ref: 'photo'}
});

ShopMemberSchema.methods.addMember = async function () {
    return this.save();
};

ShopMemberSchema.statics.generatePassword = async function (password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

ShopMemberSchema.statics.comparePassword = async function (password: string, hash: string) {
    return await bcrypt.compare(password, hash);
};

ShopMemberSchema.statics.checkPhoneNumber = async function (phoneNumber: string): Promise<boolean> {
    return (await this.findOne({ phoneNumber }).countDocuments()) > 0;
};

export const ShopMember: Model<IShopMemberModel> = model<IShopMemberModel>('ShopMember', ShopMemberSchema);
