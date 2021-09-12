import { HTTP404Error } from '../../../lib/utils/httpErrors';
import { Shop } from '../shop.schema';
import { IProductIdModel } from './productId.interface';
import { ProductId } from './productId.schema';

class ProductIdModel {
    private findProductId = async (data: IProductIdModel, message?: string) => {
        const exist = await ProductId.findById(data._id);
        if (exist) {
        } else {
            throw new HTTP404Error(message || 'Shop does not exist');
        }
    };

    private createProductId = async (shopId: string) => {
        const productId = await new ProductId({ shopId, productCount: '1' });
        await productId.save();
        return '1';
    };

    private updateProductId = async (data: IProductIdModel) => {
        let count = +data.productCount;
        count += 1;
        let productCount = count.toString();

        await ProductId.updateOne({ shopId: data.shopId }, { productCount });
        return productCount;
    };

    public generateProductId = async (data: IProductIdModel) => {
        let shopExist = await Shop.findById(data.shopId);
        if (shopExist) {
            const exist = await ProductId.findOne({ shopId: data.shopId });
            if (!exist) {
                return await this.createProductId(data.shopId);
            } else {
                return await this.updateProductId(exist);
            }
        } else {
            throw new HTTP404Error('Shop does not exist');
        }
    };
}

export default new ProductIdModel();
