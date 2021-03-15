import { ShopKeeper } from './shopkeeper.schema';
import { ShopKeeperModel } from './shopkeeper.interface';
export class ShopKeeper_Model {
    async createShopkeeper(body: ShopKeeperModel) {
        const shopKeeper: ShopKeeperModel = new ShopKeeper(body);
        const data = await shopKeeper.addNewShopKeeper();
        return data;
    }
}

export default new ShopKeeper_Model();
