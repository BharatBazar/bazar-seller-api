import { Schema } from 'mongoose';
import { ShopMember } from '../shopmember/shopmember.schema';
import { Shop } from './shop.schema';
import { IShopModel } from './shop.interface';
import { IShopMemberModel, shopMemberInterface } from '../shopmember/shopmember.interface';
import { ObjectId } from '../../datatypes';


export class ShopModel {

    

    createShop = async (body: IShopModel) => {
        
        const createShopMember = (member:any,index:number,field:string) =>{
            const id: IShopMemberModel = new ShopMember(member);
            id.save()
            body[field][index] = {_id:id._id};
        }
        
        if(body.owner.length>0) {
           createShopMember(body.owner[0],0, 'owner')
        }

        if(body.coOwner.length>0) {
            body.coOwner.map((coOwner,index) => {
                createShopMember(coOwner,index,'coOwner')
            })
        } 

        if(body.worker.length>0) {
            body.worker.map((worker,index) => {
               createShopMember(worker,index,'worker')
            })
        }

        const shop: IShopModel = new Shop(body);
        const data:IShopModel = await shop.addNewShop();
        return data;
    }

    getShop = async (body: {_id:ObjectId}) => {
        const shop = Shop.findOne({_id:body._id}).populate("owner coOwner worker");
        return shop;
    }
}

export default new ShopModel();
