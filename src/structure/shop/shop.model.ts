import { Schema, Types } from 'mongoose';
import { ShopMember } from '../shopmember/shopmember.schema';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';
import { IShopMemberModel, shopMemberInterface } from '../shopmember/shopmember.interface';
import { ObjectId } from '../../datatypes';


export class ShopModel {

    

    createShop = async (body: IShopModel) => {
        
        const shopId = Types.ObjectId();

        const createShopMember = (field: (keyof IShopModel)) =>{
            if(typeof body == 'object' && field in body) {
            body[field].map((fieldDetail:IShopMemberModel,index:number) => {
                const shopMember: IShopMemberModel = new ShopMember({...fieldDetail,shopId:shopId});
                shopMember.save()
                body[field][index] = {_id:shopMember._id};
            })
        }
        }

        createShopMember("owner");
        createShopMember("coOwner");
        createShopMember("worker")

        const shop: IShopModel = new Shop({...body,_id:shopId});
        const data:IShopModel = await shop.addNewShop();
        return data;
    }

    getShop = async (body: {_id:ObjectId}) => {
        const shop = Shop.findOne({_id:body._id}).populate("owner coOwner worker");
        return shop;
    }
}

export default new ShopModel();
