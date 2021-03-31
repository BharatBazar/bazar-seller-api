import { static } from 'express';
import { Document, Schema, Types } from 'mongoose';
export enum shopMemberRole {
    coOwner = 'coOwner',
    owner = 'owner',
    worker = 'worker',
}

export interface shopMemberInterface {
    name: string;
    //photo: [{_id:ObjectId}];
    permissions: string;
    phoneNumber: string;
    shop: string;
    role: string;
    _id: Types.ObjectId;
    password: string;
}

export interface IShopMemberModel extends shopMemberInterface, Document {
    addMember(): IShopMemberModel;
    generatePassword(): string;
    comparePassword(): boolean;
}
