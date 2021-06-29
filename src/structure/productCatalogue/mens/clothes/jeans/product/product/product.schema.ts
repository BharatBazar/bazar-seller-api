import { productStatus } from './../../../../../product/product.interface';
import { model, Model, Schema, Types } from 'mongoose';
import { IJeansModel } from './product.interface';
import { NextFunction } from 'express';

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

JeansSchema.pre('remove', async function (next: NextFunction) {
    let requests = this.colors.map((item: Types.ObjectId) => {
        return new Promise(async (resolve) => {
            resolve(await productColorModel.deleteProductColor({ _id: item }));
        });
    });

    Promise.all(requests)
        .then(() => next())
        .catch((error) => {
            throw new HTTP400Error('Problem deleting produtct');
        });
});

export const Jeans: Model<IJeansModel> = model<IJeansModel>('Jeans', JeansSchema);
