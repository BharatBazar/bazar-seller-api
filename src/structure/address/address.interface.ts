import { Document, Model, Types } from 'mongoose';

export enum addressType {
    'state' = 'State',
    'city' = 'City',
    'area' = 'Area',
}

export interface IAddress {
    addressType: addressType;
    parent: string;
    name: string;
}

export interface IAddressModel extends IAddress, Document {}
