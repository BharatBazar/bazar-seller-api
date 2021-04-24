import { UpdateQuery } from 'mongoose';
import { IId } from '../../config';
import { pruneFields } from '../../lib/helpers';
import productSizeModel from '../productSize/productSize.model';
import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductColorModel, IProductColorModelG } from './productColor.interface';
import { ProductColor } from './productColor.schema';

class ProductColorModel {
    public async createProductColor(data: IProductColorModel) {
        const productColor = new ProductColor(data);
        await productColor.save();
        return productColor;
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

    public async deleteProductColor(data: IId) {
        const exist: IProductColorModelG | null = await ProductColor.findById(data._id);
        if (exist) {
            if (exist.productSize.length > 0) {
                exist.productSize.forEach(async (item) => await productSizeModel.deleteProductSize({ _id: item }));
            }
            return await ProductColor.findByIdAndDelete(data._id);
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }
}

export default new ProductColorModel();
