import { IJeansColor } from './color.interface';
import { Types, Document } from 'mongoose';

export interface IJeansColor {
    parentId: Types.ObjectId; // will refer to main table
    color: Types.ObjectId; // will refer to color table
    sizes: [Types.ObjectId]; // will refer to jeans size table
    photos: [string];
    includedColor: [Types.ObjectId];
    identificationPhoto: string;
}

export interface IJeansColorModel extends Document, IJeansColor {}
