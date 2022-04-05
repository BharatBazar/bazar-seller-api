import { HTTP400Error } from '../../../lib/utils/httpErrors';
import { NextFunction } from 'express';
import { Schema, Types, model } from 'mongoose';
// import productColorModel from '../../productColor/productColor.model';
import { IProductModel, IProductModelG, productStatus } from './product.interface';

export const ProductSchema: Schema = new Schema(
    {
        //TODO: Fix reference cannot take string directly use id to refer the product catalogue document
        productCategory: String,
        productSubCategory1: String,
        productSubCategory2: { type: String, default: undefined },
        productBrand: String,
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        productTitle: { type: String, default: '' },
        productSubtitle: { type: String, default: '' },
        productDescription: { type: String, default: '' },
 
        showPrice: { type: Boolean, default: false },
        productStatus: { type: String, enum: productStatus, default: productStatus.NOTCOMPLETED },
        productRating: Number,
        productNew: Boolean,
        productNewDeadline: Date,
        productDiscount: [Number],
        bazarAssured: Boolean,
        productDiscountDeadline: [Date],
    },
    {
        timestamps: true,
    },
);

ProductSchema.statics.productIdExist = async function (_id: Types.ObjectId) {
    return await this.findById(_id);
};

{/*ProductSchema.pre('remove', async function (next: NextFunction) {
    let requests = this.productColor.map((item: Types.ObjectId) => {
        return new Promise(async (resolve) => {
            resolve(await productColorModel.deleteProductColor({ _id: item }));
        });
    });

    Promise.all(requests)
        .then(() => next())
        .catch((error) => {
            throw new HTTP400Error('Problem deleting produtct');
        });
});
*/}
export const Product: IProductModel = model<IProductModelG, IProductModel>('Product', ProductSchema);
