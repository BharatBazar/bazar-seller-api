import { Types, Document } from 'mongoose';

export enum filterType {
    DropDown = 'DropDown',
    Tags = 'Tags',
    CheckBox = 'CheckBox',
}

export interface SizeFilter {
    name: string;
    description: string;
    value: [Types.ObjectId];
    filterType: filterType;
}

export interface ISizeFilterModel extends Document, SizeFilter {}
