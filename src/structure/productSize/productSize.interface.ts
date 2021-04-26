import { ObjectId, Types, Document, Model } from 'mongoose';

interface ProductSizeSchema {
    productSize: string;
    productQuantity: number;
    productMrp: string;
    productSp: string;
    parentId: Types.ObjectId;
}

export interface IProductSizeModelG extends ProductSizeSchema, Document {}

export interface IProductSizeModel extends Model<IProductSizeModelG> {
    productSizeIdExist: (_id: Types.ObjectId) => Promise<boolean>;
}
