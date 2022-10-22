import { ProductSizeModelInterface, idCreationStatus } from './product_size.interface';
import { model, Schema, Types, Model } from 'mongoose';

const ProductSizeSchema: Schema = new Schema(
    {
        size: { type: Types.ObjectId, ref: 'FilterValues' },
        // mrp: String, //Optional will enable it later
        // sp: String, //Optional will enable it later
        quantity: Number,
        parentId: { type: Types.ObjectId, ref: 'ProductColor' },
        productId: { type: Types.ObjectId, ref: 'Product' },

        itemId: { type: String, default: undefined },
        shopId: { type: String, ref: 'Shop' },
    },
    {
        timestamps: true,
    },
);

export const ProductSize: Model<ProductSizeModelInterface> = model<ProductSizeModelInterface>(
    'ProductSize',
    ProductSizeSchema,
);
