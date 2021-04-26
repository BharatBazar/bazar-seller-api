import { IProductSizeModelG } from './../productSize/productSize.interface';
import { ProductSize } from './../productSize/productSize.schema';
import { IProductColorModel, IProductColorModelG } from './productColor.interface';
import { Schema, Types, model } from 'mongoose';

const ProductColorSchema: Schema = new Schema({
    parentId: { type: Types.ObjectId, ref: 'Product' },
    productColorName: String,
    productColorCode: String,
    productIncludedColor: [String],
    productSize: [{ type: Types.ObjectId, ref: 'ProductSize' }],
    productPhotos: [String],
});

ProductColorSchema.statics.productColorIdExist = async function (_id: Types.ObjectId) {
    return (await this.findById(_id).countDocuments()) > 0;
};

ProductColorSchema.pre('remove', async function (next) {
    console.log('Before product removing');
    var size: IProductSizeModelG = this;
    console.log('Size =>', size);
    await ProductSize.remove({ _id: { $in: size.productSize } });
    next();
});

export const ProductColor: IProductColorModel = model<IProductColorModelG, IProductColorModel>(
    'ProductColor',
    ProductColorSchema,
);
