import { IFilterModel } from './filter.interface';
import { Schema, Document, model, Model } from 'mongoose';
import { classifierTypes } from '../classifiers/classifier.interface';

const FilterSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        customerHeading: String,
        customerDescription: String,
        image: String,
        type: { type: String, enum: classifierTypes },
        multiple: { type: Boolean, default: false },
        filterLevel: { type: Number, default: 0 },
        active: { type: Boolean, default: false },
        mandatory: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

export const Filter: Model<IFilterModel> = model<IFilterModel>('JeansFilter', FilterSchema);
