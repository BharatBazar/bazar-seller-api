import { Types } from 'mongoose';

export interface SizeSchema {
    productSize: string;
    productQuantity: number;
    productMrp: string;
    productSp: string;
    parentId: Types.ObjectId;
}
