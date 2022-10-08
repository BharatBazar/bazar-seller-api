import { ObjectId } from '../../../src/datatypes/index';
import { Document } from 'mongoose';

export interface IBill {
    name: String;
    shop: ObjectId;
    products: ObjectId;
    totalPrice: Number;
}

export interface IBillModel extends Document, IBill {}
