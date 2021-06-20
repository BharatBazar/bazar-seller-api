import { sizeType, ISizeModel } from './size.interface';
import { Schema, Model, model } from 'mongoose';

const SizeSchema: Schema = new Schema({
    value: String,
    unit: String,
    sizeType: { type: String, enum: sizeType },
});

export const Size: Model<ISizeModel> = model<ISizeModel>('Size', SizeSchema);
