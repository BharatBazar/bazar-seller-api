import { Model, Schema, model, Types } from 'mongoose';
import { IClassifierModel, classifierTypes } from './filtervalues.interface';

const ClassifierSchema: Schema = new Schema(
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

export const Classifier: Model<IClassifierModel> = model<IClassifierModel>('FilterValues', ClassifierSchema);
