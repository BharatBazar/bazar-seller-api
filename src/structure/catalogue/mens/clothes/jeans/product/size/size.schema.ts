import { IJeansSizeModel, idCreationStatus } from './size.interface';
import { model, Schema, Types, Model } from 'mongoose';

const JeansSizeSchema: Schema = new Schema(
    {
        size: { type: Types.ObjectId, ref: 'JeansClassifier' },
        // mrp: String, //Optional will enable it later
        // sp: String, //Optional will enable it later
        quantity: Number,
        parentId: { type: Types.ObjectId, ref: 'JeansColor' },
        itemId: { type: String, default: undefined },
        shopId: { type: String, defaule: undefined },
    },
    {
        timestamps: true,
    },
);

export const JeansSize: Model<IJeansSizeModel> = model<IJeansSizeModel>('JeansSize', JeansSizeSchema);
