import { IProductIdModel } from './productId.interface';
import { Schema, Types, Model, model } from 'mongoose';

const ProductIdSchema: Schema = new Schema({
    shopId: {
        type: Types.ObjectId,
        ref: 'Shop',
        unique: true,
    },
    productCount: {
        type: String,
    },
});

export const ProductId: Model<IProductIdModel> = model<IProductIdModel>('ProductId', ProductIdSchema);
