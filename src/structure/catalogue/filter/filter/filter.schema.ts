import { IFilterModel } from './filter.interface';
import { Schema, Document, model, Model } from 'mongoose';
import { classifierTypes } from '../filtervalues/filtervalues.interface';

const FilterSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        customerHeading: String,
        customerDescription: String,
        image: String,
        customerImage: String,
        type: { type: String, enum: classifierTypes },
        key: { type: String, unique: true },
        multiple: { type: Boolean, default: false },
        filterLevel: { type: Number, default: 0 },
        active: { type: Boolean, default: false },
        mandatory: { type: Boolean, default: true },
        defaultSelectAll: { type: Boolean },
    },
    {
        timestamps: true,
    },
);

export const Filter: Model<IFilterModel> = model<IFilterModel>('JeansFilter', FilterSchema);
