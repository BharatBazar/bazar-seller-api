import { Document } from 'mongoose';

//TODO: We need to improve this approach it is just a temporary approach
interface ProductId {
    shopId: string;
    productCount: string;
}

export interface IProductIdModel extends Document, ProductId {}
