import { IProductSizeModel, IProductSizeModelG } from './productSize.interface';
import { Schema, Types, Model, model } from 'mongoose';

const ProductSizeSchema: Schema = new Schema(
    {
        productSize: String,
        productMrp: String,
        productSp: String,
        productQuantity: String,
        productParent: { Type: Types.ObjectId, ref: 'ProductColor' },
    },
    { timestamps: true },
);

ProductSizeSchema.statics.productSizeIdExist = async function (_id: Types.ObjectId) {
    return (await this.findById(_id).countDocuments()) > 0;
};

export const ProductSize: IProductSizeModel = model<IProductSizeModelG, IProductSizeModel>(
    'ProductSize',
    ProductSizeSchema,
);
