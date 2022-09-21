import { IJeansColorModel } from './color.interface';
import { Schema, Types, Model, model } from 'mongoose';

const JeansColorSchema: Schema = new Schema(
    {
        color: { type: Types.ObjectId, ref: 'JeansFilterValues' },
        sizes: [{ type: Types.ObjectId, ref: 'JeansSize' }],
        includedColor: [{ type: Types.ObjectId, ref: 'JeansFilterValues' }],
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        parentId: { type: Types.ObjectId, ref: 'Jeans' },
        identificationPhoto: String,
        photos: [{ type: String }],
    },
    { timestamps: true },
);

export const JeansColor: Model<IJeansColorModel> = model<IJeansColorModel>('JeansColor', JeansColorSchema);
