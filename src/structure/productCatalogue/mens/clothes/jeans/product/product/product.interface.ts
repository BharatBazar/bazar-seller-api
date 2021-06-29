import { Types, Document } from 'mongoose';
import { Product } from '../../../../../product/product.interface';

export interface IJeans extends Product {
    brand: Types.ObjectId;
    pattern: [Types.ObjectId];
    fit: Types.ObjectId;
    colors: [Types.ObjectId]; //will refer to color distribution table
}

export interface IJeansModel extends Document, IJeans {}
