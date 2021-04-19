import { IId } from '../../config';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductSizeModelG } from './productSize.interface';
import { ProductSize } from './productSize.schema';

class ProductSizeModel {
    public async createProductSize(data: IProductSizeModelG) {
        const product = new ProductSize(data);
        await product.save();
        return product;
    }

    public async updateProductSize(data: IProductSizeModelG) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            return await ProductSize.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async deleteProductSize(data: IId) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            return await ProductSize.findByIdAndDelete(data._id);
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async getProductSize(data: IId) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            return await ProductSize.findByIdAndDelete(data._id);
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }
}

export default new ProductSizeModel();
