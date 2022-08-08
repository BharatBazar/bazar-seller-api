import { UpdateQuery, Types } from 'mongoose';
import { IId } from '../../../../config';
import { pruneFields } from '../../../../lib/helpers';
import ProductModel from '../product/product.model';
import { HTTP400Error } from '../../../../lib/utils/httpErrors';
import { ProductColorModelInterface } from './product_color.interface';
import { ProductColor } from './product_color.schema';
import { Product } from '../product/product.schema';

class ProductColorModel {
    public async createProductColor(data: ProductColorModelInterface) {
        console.log(data);
        if (data.parentId) {
            let colors: [Types.ObjectId] = [];
            const color: ProductColorModelInterface = new ProductColor(data);
            colors.push(color._id);
            const item = await ProductModel.updateProduct({ colors, _id: data.parentId });

            color.parentId = data.parentId;

            await color.save();
            return { colorId: color._id, productId: color.parentId };
        } else {
            const color: ProductColorModelInterface = new ProductColor(data);
            const product = await ProductModel.createProduct({ colors: [color._id], shopId: data.shopId });

            await color.save();
            return { colorId: color._id, productId: product._id };
        }
    }

    public async updateProductColor(data: Partial<ProductColorModelInterface>) {
        const exist = (await ProductColor.findById(data._id).countDocuments()) > 0;
        if (exist) {
            let productColor: UpdateQuery<ProductColorModelInterface> | undefined = {};
            if (data.sizes) {
                productColor['$push'] = { sizes: { $each: data.sizes } };
                pruneFields(data, 'sizes');
            }

            productColor = { ...productColor, ...data };
            console.log(productColor, data);
            return (await ProductColor.findByIdAndUpdate(data._id, productColor, { new: true }))?._id;
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }

    public async deleteProductColor(data: IId & { parentId?: string }) {
        const exist: ProductColorModelInterface | null = await ProductColor.findById(data._id);
        if (exist) {
            if (data.parentId) {
                await Product.findByIdAndUpdate(data.parentId, { $pull: { colors: data._id } });
            }
            await exist.delete();
            return '';
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }

    public async getProductColor(data: IId) {
        const exist = (await ProductColor.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await ProductColor.findById(data._id).populate({ path: 'productSize' });
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }
}

export default new ProductColorModel();
