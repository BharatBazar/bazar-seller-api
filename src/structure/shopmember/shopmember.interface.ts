import { Document, Schema, Types } from 'mongoose';
export enum shopMemberRole {
    coOwner = 'Co-owner',
    owner = 'Owner',
    worker = 'Worker',
}

export interface shopMemberInterface {
    firstName: string;
    lastName: string;
    //photo: [{_id:ObjectId}];
    permissions: Types.ObjectId;
    phoneNumber: string;
    shop: Types.ObjectId;
    role: string;
    _id: Types.ObjectId;
    password: string;
    isTerminated: boolean;
    isDeleted: boolean;
    languagePreference: ['Hindi', 'English', 'Message'];
}

export interface IShopMemberModel extends shopMemberInterface, Document {
    addMember(): IShopMemberModel;
    generatePassword(): string;
    comparePassword(): boolean;
}
