import { IFilterModel } from './filter.interface';
import { Schema, Document, model, Model, Types } from 'mongoose';
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
        filterActivatedCount: { type: Number, default: 0 },
        mandatory: { type: Boolean, default: true },
        defaultSelectAll: { type: Boolean, default: true },
        parent: { type: Types.ObjectId, ref: 'ProductCatalogue' },
        showSearch: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const Filter: Model<IFilterModel> = model<IFilterModel>('Filter', FilterSchema);
