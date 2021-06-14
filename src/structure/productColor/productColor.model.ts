import { UpdateQuery, Types } from 'mongoose';
import { IId } from '../../config';
import { pruneFields } from '../../lib/helpers';
import productModel from '../productCatalogue/product/product.model';
import { Product } from '../productCatalogue/product/product.schema';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductColorModelG } from './productColor.interface';
import { ProductColor } from './productColor.schema';

class ProductColorModel {
    public async createProductColor(data: IProductColorModelG) {
        if (data.parentId) {
            let productColor: [Types.ObjectId] = [];
            const color: IProductColorModelG = new ProductColor(data);
            productColor.push(color._id);
            const item = await productModel.updateProduct({ productColor, _id: data.parentId });
            console.log(item);
            color.parentId = data.parentId;

            await color.save();
            return color;
        } else {
            throw new HTTP400Error('Please provide parent id');
        }
    }

    public async updateProductColor(data: IProductColorModelG) {
        const exist = await ProductColor.productColorIdExist(data._id);
        if (exist) {
            let productColor: UpdateQuery<IProductColorModelG> | undefined = {};
            if (data.productSize) {
                productColor['$push'] = { productSize: { $each: data.productSize } };
            }
            pruneFields(data, 'productSize');
            productColor = { ...productColor, ...data };
            return (await ProductColor.findByIdAndUpdate(data._id, productColor, { new: true }))?._id;
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }

    public async deleteProductColor(data: IId & { parenId?: string }) {
        console.log(data);
        const exist: IProductColorModelG | null = await ProductColor.findById(data._id);
        if (exist) {
            if (data.parenId) {
                await Product.findByIdAndUpdate(data.parenId, { $pull: { productColor: data._id } });
            }
            //await ProductSize.deleteMany({ _id: { $in: exist.productSize } });
            await exist.delete();
            //await ProductColor.findOneAndRemove({ _id: data._id });
            return '';
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }

    public async getProductColor(data: IId) {
        const exist = await ProductColor.productColorIdExist(data._id);
        if (exist) {
            return await ProductColor.findById(data._id).populate({ path: 'productSize' });
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }
}

export default new ProductColorModel();
