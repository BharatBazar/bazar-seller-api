import { ShopMember } from '../shopmember/shopmember.schema';
import { IShopMemberModel } from '../shopmember/shopmember.interface';
import { Shop } from './shop.schema';
import { IShopModel } from './shopinterface';
export class ShopModel {

    async createShop(body: IShopModel) {
        if(body.owner) {
            const owner:IShopMemberModel = new ShopMember(body.owner[0]);
        }
        
        const shop: IShopModel = new Shop(body);
        const data = await shop.addNewShop();
        return data;
    }
}

export default new ShopModel();
