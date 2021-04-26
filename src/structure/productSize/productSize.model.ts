import { Types } from 'mongoose';
import { IId } from '../../config';
import productColorModel from '../productColor/productColor.model';
import { ProductColor } from '../productColor/productColor.schema';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductSizeModelG } from './productSize.interface';
import { ProductSize } from './productSize.schema';

class ProductSizeModel {
    public async createProductSize(data: IProductSizeModelG) {
        if (data.parentId) {
            const size: IProductSizeModelG = new ProductSize(data);
            let productSize: [Types.ObjectId] = [];
            productSize.push(size._id);
            await productColorModel.updateProductColor({ productSize, _id: data.parentId });
            await size.save();
            return size;
        } else {
            throw new HTTP400Error('Please provide parentId.');
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

    public async deleteProductSize(data: IId & { parentId?: Types.ObjectId }) {
        console.log(data);
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            if (data.parentId) {
                await ProductColor.findByIdAndUpdate(data.parentId, { $pull: { productSize: data._id } });
            }
            await ProductSize.findByIdAndDelete(data._id);
            return;
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async getProductSize(data: IId) {
        const exist = await ProductSize.productSizeIdExist(data._id);
        if (exist) {
            return await ProductSize.findById(data._id);
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }
}

export default new ProductSizeModel();
