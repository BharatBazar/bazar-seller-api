import { IProductColorModel, IProductColorModelG } from './productColor.interface';
import { Schema, Types, model } from 'mongoose';

const ProductColorSchema: Schema = new Schema({
    productParent: { type: Types.ObjectId, ref: 'Product' },
    productSize: [String],
    productIncludedColor: [String],
    productSize: [{ type: Types.ObjectId, ref: 'ProductSize' }],
    productPhotos: [String],
});

ProductColorSchema.statics.productColorIdExist = async function (_id: Types.ObjectId) {
    return (await this.findById(_id).countDocuments()) > 0;
};

ProductColorSchema.pre('remove', async function () {});

export const ProductColor: IProductColorModel = model<IProductColorModelG, IProductColorModel>(
    'ProductColor',
    ProductColorSchema,
);
