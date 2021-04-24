import { Types } from 'mongoose';
import { IId } from '../../config';
import productColorModel from '../productColor/productColor.model';
import { ProductColor } from '../productColor/productColor.schema';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductSizeModelG } from './productSize.interface';
import { ProductSize } from './productSize.schema';

class ProductSizeModel {
    public async createProductSize(data: { productSize: IProductSizeModelG } & { parentId?: Types.ObjectId }) {
        if (data.parentId) {
            const size: IProductSizeModelG = new ProductSize(data.productSize);
            size.parentId = data.parentId;
            let productSize: Types.ObjectId[] = [];
            productSize.push(size._id);
            await productColorModel.updateProductColor({ productSize, _id: data.parentId });
            await size.save();
            return size;
        } else {
            const productSize = new ProductSize(data.productSize);
            const productColor = new ProductColor();
            productColor.productSize.push(productSize._id);
            productSize.parentId = productColor._id;
            await productColor.save();
            await productSize.save();
            return productSize;
        }
    }

    public async updateProductSize(data: IProductSizeModelG) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            return await ProductSize.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async deleteProductSize(data: IId & { parentId: Types.ObjectId }) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            await ProductColor.findByIdAndUpdate(data.parentId, { $pull: { productSize: data._id } });
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
