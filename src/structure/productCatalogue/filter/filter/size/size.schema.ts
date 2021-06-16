import { model, Schema, Types, Model } from 'mongoose';
import { filterType } from '../../filter.interface';
import { ISizeFilterModel } from './size.interface';

const SizeFilterSchema: Schema = new Schema({
    name: String,
    description: String,
    filterType: { type: String, enum: filterType },
    value: [{ type: Types.ObjectId, ref: 'Size' }],
});

export const SizeFilter: Model<ISizeFilterModel> = model<ISizeFilterModel>('SizeFilter', SizeFilterSchema);
