import { Document } from 'mongoose';

import { ObjectId } from '../../../src/datatypes';

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
