import { NextFunction } from 'express';
import { Schema, Types, Model, model } from 'mongoose';
import productColorModel from '../productColor/productColor.model';
import { ProductColor } from '../productColor/productColor.schema';
import { IProductModel, IProductModelG, productStatus } from './product.interface';

const ProductSchema: Schema = new Schema(
    {
        productCategory: String,
        productSubCategory1: String,
        productSubCategory2: { type: String, default: undefined },
        productTitle: { type: String, default: '' },
        productSubtitle: { type: String, default: '' },
        productDescription: { type: String, default: '' },
        productColor: [{ type: Types.ObjectId, ref: 'ProductColor' }],
        showPrice: { type: Boolean, default: false },
        productStatus: { type: String, enum: productStatus, default: productStatus.NOTCOMPLETED },
        productRating: Number,
        productNew: Boolean,
        productNewDeadline: Date,
        productDiscount: [Number],
        productDiscountDeadline: [Date],
    },
    {
        timestamps: true,
    },
);

ProductSchema.statics.productIdExist = async function (_id: Types.ObjectId) {
    return await this.findById(_id);
};

export const Product: IProductModel = model<IProductModelG, IProductModel>('Product', ProductSchema);
