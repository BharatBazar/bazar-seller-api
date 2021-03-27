import { ShopModel } from './../shop/shop.model';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { log } from 'util';
import ShopPermissionModel from './../permission/permission.model';
import { ShopMember } from './shopmember.schema';
import { IShopMemberModel,shopMemberInterface, shopMemberRole } from "./shopmember.interface";
import { LeanDocument } from 'mongoose';

export class ShopMemberModel {
    async createShopMember(shopMember:shopMemberInterface) {
       
        let member:IShopMemberModel = new ShopMember(shopMember);
        member.permissions = await ShopPermissionModel.createPermisison(member.role);
        await member.save();
        return member._id;
    }

    async ShopMemberLogin({phoneNumber}:{phoneNumber:string}) {
        if(!phoneNumber ) {
            throw new HTTP400Error("Please provide phone number.")
        } else {
            let phone: LeanDocument<IShopMemberModel> | null;
            phone = await ShopMember.findOne({phoneNumber}).lean().populate({path:"permissions shop", populate: "owner coOwner worker"});
            if(phone) {
                    return phone
                }
                else {
                throw new HTTP400Error("Phone number does not exist please tell your shop owner to add you as a member.")
            }
        }
    }
}

export default new ShopMemberModel();