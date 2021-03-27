import { log } from 'util';
import ShopPermissionModel from './../permission/permission.model';
import { ShopMember } from './shopmember.schema';
import { IShopMemberModel,shopMemberInterface } from "./shopmember.interface";

export class ShopMemberModel {
    async createShopMember(shopMember:shopMemberInterface) {
       
        let member:IShopMemberModel = new ShopMember(shopMember);
        //log(typeof member, typeof member._id,"Member",member)
        member.permissions = await ShopPermissionModel.createPermisison(member.role);
        
        await member.save();
        //log(member)
        return member._id;
    }
}

export default new ShopMemberModel();