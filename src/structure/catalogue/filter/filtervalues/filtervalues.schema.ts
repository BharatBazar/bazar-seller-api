import { Model, Schema, model, Types } from 'mongoose';
import { IFilterValuesModel, filterValuesTypes } from './filtervalues.interface';

const FilterValuesSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        customerName: String,
        customerDescription: String,
        customerImage: String,
        image: String,

        parent: { type: Types.ObjectId, ref: 'Filter' },
        active: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const FilterValues: Model<IFilterValuesModel> = model<IFilterValuesModel>('FilterValues', FilterValuesSchema);
