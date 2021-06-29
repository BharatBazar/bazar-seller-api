import { productStatus } from './../../../../../product/product.interface';
import { model, Model, Schema, Types } from 'mongoose';
import { IJeansModel } from './product.interface';

const JeansSchema: Schema = new Schema(
    {
        //TODO: Fix reference cannot take string directly use id to refer the product catalogue document
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        description: { type: String, default: '' },

        showPrice: { type: Boolean, default: false },
        status: { type: String, enum: productStatus, default: productStatus.NOTCOMPLETED },
        rating: Number,
        new: Boolean,
        newDeadline: Date,
        discount: [Number],
        bazarAssured: Boolean,
        discountDeadline: [Date],

        //filters
        pattern: [{ type: Types.ObjectId, ref: 'JeansClassifier' }],
        fit: { type: Types.ObjectId, ref: 'JeansClassifier' },
        brand: { type: Types.ObjectId, ref: 'JeansClassifier' },
        colors: [{ type: Types.ObjectId, ref: 'JeansColor' }],
    },
    { timestamps: true },
);

export const Jeans: Model<IJeansModel> = model<IJeansModel>('Jeans', JeansSchema);
