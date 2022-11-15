import { ObjectId } from '../../../src/datatypes/index';
import { Document } from 'mongoose';

interface IProduct{
    map:Function
}

export interface IBill {
    name: String;
    shop: ObjectId;
    products: IProduct;
    totalPrice: Number;
   
}

export interface IBillModel extends Document, IBill {}
