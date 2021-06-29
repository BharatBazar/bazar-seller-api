import { Types, Document } from 'mongoose';

export interface IJeansSize {
    size: Types.ObjectId; //Will refer to size table
    mrp: string;
    quantity: string;
    sp: string;
    parentId: Types.ObjectId;
}

export interface IJeansSizeModel extends Document, IJeansSize {}
