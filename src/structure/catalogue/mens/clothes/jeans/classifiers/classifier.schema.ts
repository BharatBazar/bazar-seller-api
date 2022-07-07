import { Model, Schema, model, Types } from 'mongoose';
import { IClassifierModel, classifierTypes } from './classifier.interface';

const ClassifierSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        customerName: String,
        customerDescription: String,
        image: String,
        type: { type: String, enum: classifierTypes },
        parent: { type: Types.ObjectId, ref: 'JeansFilter' },
        active: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const Classifier: Model<IClassifierModel> = model<IClassifierModel>('JeansClassifier', ClassifierSchema);
