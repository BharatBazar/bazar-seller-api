import {  Document, ObjectId, Schema } from "mongoose";
export enum shopMemberRole {coOwner='coOwner',owner='owner',worker='worker'};


interface shopMemberInterface {
    name:string;
    photo: [{_id:ObjectId}];
    permission: {_id:ObjectId};
    phoneNumber: [string];
    shopId: {_id:ObjectId};
    role: shopMemberRole;
    
}

export interface IShopMemberModel extends shopMemberInterface, Document {
    addMember(): IShopMemberModel
}
