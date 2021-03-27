import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IPermissionModel } from './../permission/permission.interface';
import { shopMemberInterface } from './../shopmember/shopmember.interface';
import  ShopMemberModel from './../shopmember/shopmember.model';
import { log } from 'util';
import { Schema, Types, ObjectId } from 'mongoose';
import { ShopMember } from '../shopmember/shopmember.schema';
import { Shop, ShopSchema } from './shop.schema';
import { IShopModel } from './shop.interface';



export class ShopModel {

    public createShop = async (body: IShopModel) => {
        const shop: IShopModel = new Shop(body);
        const shopMember:Partial<shopMemberInterface> = {shopId:shop._id, name:shop.ownerName,phoneNumber:[shop.ownerPhoneNumber], role:'owner'};
        const ownerId = await ShopMemberModel.createShopMember(shopMember);
        shop.owner.push(ownerId);
        const data:IShopModel = await shop.addNewShop();
        return data;
    }

    public getShop = async (body: {_id:ObjectId}) => {
        const shop:IShopModel | null = await Shop.findOne({_id:body._id}).populate({path: "owner coOwner worker", populate:{
            path: 'permissions'
        }});
       if(shop)
        return shop;
        else 
        throw new HTTP400Error("Shop does not exist");
    }

    public updateShop = async (body: IShopModel) => {
        const shop:IShopModel = await Shop.shopExist(body._id);
        log("Shop Details",shop)
        if(body.coOwner) {
            return body.coOwner.forEach(async (details:Object,index:Number) => {
                const id = await ShopMemberModel.createShopMember({shopId:shop._id, role:"coOwner", ...details});
                shop.coOwner.push(id);
                if(index==body.coOwner.length-1) {
                               await shop.save();
            return shop;
                }
            })
           
        }
        else {
        return shop
        }
    }

}

export default new ShopModel();
