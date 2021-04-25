import { IProductSizeModel, IProductSizeModelG } from './productSize.interface';
import { Schema, Types, Model, model } from 'mongoose';

const ProductSizeSchema: Schema = new Schema(
    {
        productSize: String,
        productMrp: String,
        productSp: String,
        productQuantity: String,
        parentId: { type: Types.ObjectId, ref: 'ProductColor' },
    },
    { timestamps: true },
);

ProductSizeSchema.statics.productSizeIdExist = async function (_id: Types.ObjectId) {
    return (await this.findById(_id).countDocuments()) > 0;
};

ProductSizeSchema.pre('deleteOne', async function (next) {
    console.log('Product stixe removed', this._id);
    next();
});

export const ProductSize: IProductSizeModel = model<IProductSizeModelG, IProductSizeModel>(
    'ProductSize',
    ProductSizeSchema,
);
