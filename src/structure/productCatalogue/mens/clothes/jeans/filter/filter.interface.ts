import { Types, Document } from 'mongoose';

export interface JaeansFilterI {
    size: Types.ObjectId;
    brand: Types.ObjectId;
    colors: Types.ObjectId;
    category: Types.ObjectId;
}

export interface JeansFilterModel extends Document, JaeansFilterI {}
