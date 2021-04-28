import { HTTP400Error } from './../../lib/utils/httpErrors';
import { Types } from 'mongoose';
import { pruneFields } from '../../lib/helpers';
import { IShopCatalogueModelG, ICategory } from './shopCatalogue.interface';
import { ShopCatalogue } from './shopCatalogue.schema';

class ShopCatelogueModel {
    public async updateCatalogue(data: ICategory & { shopId: string }) {
        const catagory = { ...data };
        pruneFields(data, 'shopId');
        const exist = await ShopCatalogue.findOne(data);
        if (exist) {
            exist.shopIds.push(catagory.shopId);
            await exist.save();
            return 'Updated';
        } else {
            const catalogue: IShopCatalogueModelG = await this.createCatalogue(data);
            catalogue.shopIds.push(catagory.shopId);
            await catalogue.save();
            return 'Created';
        }
    }

    public async createCatalogue(data: ICategory) {
        const catalogue = new ShopCatalogue(data);
        return catalogue;
    }

    public async deleteShopFromCatalogue(data: { category: ICategory } & { shopId: Types.ObjectId }) {
        const deleted = await ShopCatalogue.findOneAndUpdate(data.category, { $pull: { shopIds: data.shopId } });
        if (deleted) {
            return 'Shop delete from category';
        } else {
            throw new HTTP400Error('Either category not found or shop not found');
        }
    }

    public async deleteCategory(data: ICategory) {
        const deleted = await ShopCatalogue.deleteMany(data);
        if (deleted) {
            return 'Remove all docuement which matched query.';
        } else {
            throw new HTTP400Error('Error while deleting categories');
        }
    }
}

export default new ShopCatelogueModel();
