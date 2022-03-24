import { HTTP400Error } from '../../../../../../../lib/utils/httpErrors';
import { productStatus } from '../../../../../product/product.interface';
import { model, Model, Schema, Types } from 'mongoose';
import { IJeansModel } from './product.interface';
import { NextFunction } from 'express';
import JeansColorModel from '../colors/color.model';

const JeansSchema: Schema = new Schema(
    {
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        title: { type: String, default: '' },
        subTitle: { type: String, default: '' },
        description: { type: String, default: '' },
        descriptionCustomer: { type: String, default: '' },

        //Product settings
        showPrice: { type: Boolean, default: false },
        new: { type: Boolean, default: false },
        newDeadline: { type: String, default: '' },
        returnAllowed: { type: Boolean, default: false },
        discount: [Number],
        discountDeadline: [Date],

        status: { type: Number, enum: productStatus, default: productStatus.INVENTORY },
        note: { type: [String], default: [] },
        alreadyRejected: { type: Boolean, default: false },
        rating: Number,

        bazarAssured: Boolean,

        //filters
        pattern: [{ type: Types.ObjectId, ref: 'JeansClassifier', default: undefined }],
        fit: [{ type: Types.ObjectId, ref: 'JeansClassifier', default: undefined }],
        brand: [{ type: Types.ObjectId, ref: 'JeansClassifier', default: undefined }],

        //distribution
        colors: [{ type: Types.ObjectId, ref: 'JeansColor', default: undefined }],
    },
    { timestamps: true },
);

JeansSchema.pre('remove', async function (next: NextFunction) {
    let requests = this.colors.map((item: Types.ObjectId) => {
        return new Promise(async (resolve) => {
            resolve(await JeansColorModel.deleteJeansColor({ _id: item }));
        });
    });

    Promise.all(requests)
        .then(() => next())
        .catch((error) => {
            throw new HTTP400Error('Problem deleting produtct');
        });
});

export const Jeans: Model<IJeansModel> = model<IJeansModel>('Jeans', JeansSchema);
