import { ObjectId, Document } from "mongoose";

interface shopMemberInterface {
    name:string;
    photo: [{_id: ObjectId}];
    permission: {_id:ObjectId};
    phoneNumber: [string];
    shopId: {_id:ObjectId};
    role: ['coOwner','owner','worker']
}

export interface ShopMemberModelI extends shopMemberInterface, Document {
}
