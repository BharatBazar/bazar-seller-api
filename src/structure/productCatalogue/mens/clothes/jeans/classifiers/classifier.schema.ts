import { Model, Schema, model } from 'mongoose';
import { IClassifierModel, classifierTypes } from './classifier.interface';

const ClassifierSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        type: { type: String, enum: classifierTypes },
    },
    {
        timestamps: true,
    },
);

export const Classifier: Model<IClassifierModel> = model<IClassifierModel>('JeansClassifier', ClassifierSchema);
