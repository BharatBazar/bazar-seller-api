import { log } from 'util';
import { IShopPermissionModel, ShopPermissionSchemaInterface } from './permission.interface';
import {ShopPermissions } from './permission.schema';
import { shopMemberRole } from "../shopmember/shopmember.interface";

export class ShopPermissionModel {

    ownerPermission:ShopPermissionSchemaInterface = {
        createBill:true,
        createProduct:true,
        editProduct:true,
        talkToCustomer:true,
        rollOutProduct:true,
        bookingNotification:true
    }

    async createPermisison(role:String) {
        console.log("creating Permission",role)
        let permissions:IShopPermissionModel;
        if(role==shopMemberRole.owner) {
            permissions = new ShopPermissions(this.ownerPermission);
        } else {
            permissions = new ShopPermissions();  
        }
       
        await permissions.save();
        
        return permissions._id;
    }
}

export default new ShopPermissionModel();

