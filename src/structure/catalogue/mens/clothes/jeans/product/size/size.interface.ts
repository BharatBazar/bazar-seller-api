import { Types, Document } from 'mongoose';

export enum idCreationStatus {
    'NotCreated' = 0,
    'CreatedNotProvided' = 1,
    'CreatedAndProvided' = 2,
}
export interface IJeansSize {
    size: Types.ObjectId; //Will refer to size table
    //mrp: string;  //Will enable it later on
    quantity: string;
    //sp: string; //Will enable it later on
    parentId: Types.ObjectId;
    itemId: string; //default id given by us for produt recognition in shop
    //idStatus: idCreationStatus; // not required for now
}

export interface IJeansSizeModel extends Document, IJeansSize {}
