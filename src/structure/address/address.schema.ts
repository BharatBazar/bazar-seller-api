import { Model, Schema, Types, model } from 'mongoose';
import { addressType, IAddressModel } from './address.interface';

const AddressSchema: Schema = new Schema({
    parent: { type: Types.ObjectId, ref: 'Address', default: undefined },
    name: String,
    addressType: { type: String, enum: addressType },
});

export const Address: Model<IAddressModel> = model<IAddressModel>('Address', AddressSchema);
