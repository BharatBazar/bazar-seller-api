import { IJeansColorModel } from './color.interface';
import { Schema, Types, Model, model } from 'mongoose';

const JeansColorSchema: Schema = new Schema(
    {
        color: { type: Types.ObjectId, ref: 'JeansClassifier' },
        sizes: [{ type: Types.ObjectId, ref: 'JeansSize' }],
        photos: [{ type: String }],
        includedColor: [{ type: Types.ObjectId, ref: 'JeansClassifier' }],
        parentId: { type: Types.ObjectId, ref: 'Jeans' },
        identificationPhoto: String,
        shopId: { type: Types.ObjectId, ref: 'Shop' },
    },
    { timestamps: true },
);

export const JeansColor: Model<IJeansColorModel> = model<IJeansColorModel>('JeansColor', JeansColorSchema);
