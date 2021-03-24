import PermissionModel from './../permission/permission.model';
import { ShopMember } from './shopmember.schema';
import { IShopMemberModel } from "./shopmember.interface";

export class ShopMemberModel {
    async createShopMember(shopMember: IShopMemberModel) {
        const member:IShopMemberModel = new ShopMember(shopMember);
        member.permission = await PermissionModel.createPermisison(member.role);
        return member.addMember()._id;
    }
}