import { IProductColorModel } from './productColor.interface';
import { Model, Schema, Types, model } from 'mongoose';

const ProductColorSchema: Schema = new Schema({
    productParent: { type: Types.ObjectId, ref: 'Product' },
    productColor: [String],
    productSize: [Number],
    productQuantity: [Number],
    productMrp: [Number],
    productSp: [Number],
    productPhotos: [String],
});

export const ProductColor: Model<IProductColorModel> = model<IProductColorModel>('ProductColor', ProductColorSchema);
