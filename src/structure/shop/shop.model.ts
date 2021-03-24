import { Schema, ObjectId } from 'mongoose';
import { ShopMember } from '../shopmember/shopmember.schema';
import { IShopMemberModel } from '../shopmember/shopmember.interface';
import { Shop } from './shop.schema';
import { IShopModel } from './shopinterface';
export class ShopModel {
    ObjectId = Schema.Types.ObjectId;

    

    createShop = async (body: IShopModel) => {
        
        if(body.owner) {
            const id: Schema.Types.ObjectId = new ShopMember(body.owner[0]);
            body.owner[0] = {_id:id};
        }

        if(body.coOwner) {
            body.coOwner.map((coOwner,index) => {
                const id: Schema.Types.ObjectId = new ShopMember(coOwner);
                body.coOwner[index] = {_id:id};
            })
        } 

        if(body.worker) {
            body.worker.map((worker,index) => {
                const id: Schema.Types.ObjectId = new ShopMember(worker);
                body.worker[index] = {_id:id};
            })
        }

        const shop: IShopModel = new Shop(body);
        const data = await shop.addNewShop();
        console.log(data)
        return data;
    }
}

export default new ShopModel();
