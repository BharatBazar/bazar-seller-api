import { IFilterModel } from './filter.interface';
import { Schema, Document, model, Model } from 'mongoose';
import { classifierTypes } from '../classifiers/classifier.interface';

const FilterSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        type: { type: String, enum: classifierTypes },
        multile: Boolean,
        distributionLevel: Number,
    },
    {
        timestamps: true,
    },
);

export const Fitler: Model<IFilterModel> = model<IFilterModel>('JeansFilter', FilterSchema);
