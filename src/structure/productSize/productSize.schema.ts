import { IProductSizeModel } from './productSize.interface';
import { Schema, Types, Model, model } from 'mongoose';

const ProductSizeSchema: Schema = new Schema(
    {
        productSize: Number,
        productMrp: Number,
        productSp: Number,
        productQuantity: Number,
        productParent: { Type: Types.ObjectId, ref: 'ProductColor' },
    },
    { timestamps: true },
);

export const ProductSize: Model<IProductSizeModel> = model<IProductSizeModel>('ProductSize', ProductSizeSchema);
