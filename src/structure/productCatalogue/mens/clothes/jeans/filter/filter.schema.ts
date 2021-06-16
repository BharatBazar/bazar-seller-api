import { JeansFilterModel } from './filter.interface';
import { model, Model, Schema, Types } from 'mongoose';

const JeansFilterSchema: Schema = new Schema(
    {
        size: { type: Types.ObjectId, ref: 'SizeFilter' },
        brand: { type: Types.ObjectId, ref: 'BrandFilter' },
        category: { type: Types.ObjectId, ref: 'Category' },
    },
    {
        timestamps: true,
    },
);

export const JeansFilter: Model<JeansFilterModel> = model<JeansFilterModel>('JeansFilter', JeansFilterSchema);
