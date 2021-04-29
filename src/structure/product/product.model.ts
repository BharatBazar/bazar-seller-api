import { UpdateQuery } from 'mongoose';
import { pruneFields } from '../../lib/helpers';
import { IId, paginationConfig } from './../../config/index';
import { HTTP404Error, HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductModelG } from './product.interface';
import { Product } from './product.schema';

class ProductModel {
    public async createProduct(data: IProductModelG) {
        const product = new Product(data);
        await product.save();
        return product;
    }

    public async updateProduct(data: Partial<IProductModelG>) {
        const exist: IProductModelG | null = await Product.productIdExist(data._id);
        if (exist) {
            let product: UpdateQuery<IProductModelG> | undefined = {};
            if (data.productColor) {
                product['$push'] = { productColor: { $each: data.productColor } };
                pruneFields(data, 'productColor');
            }

            product = { ...product, ...data };

            await Product.findByIdAndUpdate(data._id, product, { new: true });
            return '';
        } else {
            throw new HTTP404Error('Product not found.');
        }
    }

    public async deleteProduct(data: IProductModelG) {
        const exist: IProductModelG | null = await Product.findById(data._id);
        if (exist) {
            await exist.delete();
            return '';
        } else {
            throw new HTTP404Error('Product not found.');
        }
    }

    public async getProduct(data: IId) {
        const exist = await Product.productIdExist(data._id);
        if (exist) {
            return await Product.findById(data._id).populate({
                path: 'productColor',
                populate: {
                    path: 'productSize',
                },
            });
        } else {
            throw new HTTP400Error('Product not found.');
        }
    }

    public getAllProduct = async (query: any) => {
        if (!query.query) {
            throw new HTTP400Error('No query available');
        }

        let condition: any = {};
        if (query.lastTime) {
            const dateObj = new Date(parseInt(query.lastTime, 10));
            condition.createdAt = { $lt: dateObj };
        }

        const searchCount = await Product.countDocuments({ $and: [query.query, condition] });

        const data =
            searchCount > 0
                ? await Product.find({ $and: [condition, query.query] })
                      .sort('-createdAt')
                      .limit(paginationConfig.MAX_PRODUCT)
                : [];

        const lastTime = data.length > 0 ? data[data.length - 1].createdAt.getTime() : undefined;

        return {
            payload: data,
            searchCount,
            lastTime,
            maxCount: paginationConfig.MAX_PRODUCT,
        };
    };
}

export default new ProductModel();
