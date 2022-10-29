import { IBillModel } from './billdesk.interface';
import { Schema, Document, model, Model, Types } from 'mongoose';

const BillSchema: Schema = new Schema(
    {
        name: String,
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        totalPrice: Number,
        // products: { type: [Types.ObjectId], ref: 'ProductSize' },
        products: [
            {
                productSize: {
                    type: Types.ObjectId,
                    ref: 'ProductSize',
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

// "products":[{"productName":"62c53cb0d5887173c62edebe","quantity":6,"price":300},{"productName":"62c53cb0d5887173c62edebe","quantity":6,"price":300},{"productName":"62c53cb0d5887173c62edebe","quantity":6,"price":300},{"productName":"62c53cb0d5887173c62edebe","quantity":6,"price":300}]

export const Bill: Model<IBillModel> = model<IBillModel>('Bill', BillSchema);
