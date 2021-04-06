import { Schema, Types, Model, model } from 'mongoose';
import { IProductModel, productStatus } from './product.interface';

const ProductSchema: Schema = new Schema(
    {
        productCategory: String,
        productSubCategory1: String,
        productSubCategory2: { type: String, default: undefined },
        productTitle: String,
        productSubtitle: String,
        productColor: [{ type: Types.ObjectId, ref: 'ProductColor' }],
        showPrice: Boolean,
        productStatus: { type: String, enum: productStatus },
        productRating: Number,
        productNew: Boolean,
        productNewDeadline: Date,
        productDescription: String,
        productDiscount: [Number],
        productDiscountDeadline: [Date],
    },
    {
        timestamps: true,
    },
);

export const Product: Model<IProductModel> = model<IProductModel>('Product', ProductSchema);
