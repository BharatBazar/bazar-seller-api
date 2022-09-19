import { model, Model, Schema, Types } from 'mongoose';
import { ProductColorModelInterface } from './product_color.interface';

const ProductColorSchema: Schema = new Schema(
    {
        color: { type: Types.ObjectId, ref: 'FilterValues' },
        sizes: { type: [Types.ObjectId], ref: 'ProductSize' },
        includedColor: { type: [Types.ObjectId], ref: 'FilterValues' },
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        parentId: { type: Types.ObjectId, ref: 'Product' },
        identificationPhoto: String,
        photos: [{ type: String }],
    },
    { timestamps: true },
);

export const ProductColor: Model<ProductColorModelInterface> = model<ProductColorModelInterface>(
    'ProductColor',
    ProductColorSchema,
);
