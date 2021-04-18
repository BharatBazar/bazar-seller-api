import { ObjectId, Types, Document } from 'mongoose';

interface ProductSizeSchema {
    productSize: number;
    productQuantity: string;
    productMrp: string;
    productSp: string;
    productParent: Types.ObjectId;
}

export interface IProductSizeModel extends ProductSizeSchema, Document {}
