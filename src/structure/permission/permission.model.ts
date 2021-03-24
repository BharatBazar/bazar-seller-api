import { IPermissionModel, permissionSchemaInterface } from './permission.interface';
import {Permissions } from './permission.schema';
import { shopMemberRole } from "../shopmember/shopmember.interface";

export class PermissionModel {

    ownerPermission:permissionSchemaInterface = {
        createBill:true,
        createProduct:true,
        editProduct:true,
        talkToCustomer:true,
        rollOutProduct:true,
        bookingNotification:true
    }

    async createPermisison(role:shopMemberRole) {
        let permissions:IPermissionModel;
        if(role==shopMemberRole.owner) {
            permissions = new Permissions(this.ownerPermission);
        } else {
            permissions = new Permissions();  
        }
        return permissions.addPermission()._id;
    }
}

export default new PermissionModel();

