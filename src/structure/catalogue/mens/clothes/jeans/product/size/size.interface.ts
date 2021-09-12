import { Types, Document } from 'mongoose';

export enum idCreationStatus {
    'NotCreated' = 0,
    'CreatedNotProvided' = 1,
    'CreatedAndProvided' = 2,
}
export interface IJeansSize {
    size: Types.ObjectId; //Will refer to size table
    mrp: string;
    quantity: string;
    sp: string;
    parentId: Types.ObjectId;
    itemId: string;
    idStatus: idCreationStatus;
}

export interface IJeansSizeModel extends Document, IJeansSize {}
