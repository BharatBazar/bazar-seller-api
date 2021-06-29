import { IJeansSizeModel } from './size.interface';
import { model, Schema, Types, Model } from 'mongoose';

const JeansSizeSchema: Schema = new Schema(
    {
        size: { type: Types.ObjectId, ref: 'JeansClassifier' },
        mrp: String,
        sp: String,
        quantity: Number,
        parentId: { type: Types.ObjectId, ref: 'JeansColor' },
    },
    {
        timestamps: true,
    },
);

export const JeansSize: Model<IJeansSizeModel> = model<IJeansSizeModel>('JeansSize', JeansSizeSchema);
