import { IBillModel } from './billdesk.interface';
import { Schema, Document, model, Model, Types } from 'mongoose';

const BillSchema: Schema = new Schema(
    {
        name: String,
        shop: { type: Types.ObjectId, ref: 'Shop' },
        totalPrice: Number,
        products: [
            {
                // productName: {
                //     type: Types.ObjectId,
                //     ref: 'Product',
                // },
                productName: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const Bill: Model<IBillModel> = model<IBillModel>('Bill', BillSchema);
