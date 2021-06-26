import { Schema } from 'mongoose';
import { classifierTypes } from '../classifier/classifier.interface';

const FilterSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        type: { type: String, enum: classifierTypes },
        multile: Boolean,
        distributionLevel: Number,
    },
    {
        timestamps: true,
    },
);
