import { Schema } from 'mongoose';
import { classifierTypes } from './classifier.interface';

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
