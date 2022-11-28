import { UpdateQuery, Types, ObjectId, Query } from 'mongoose';
import { IId } from '../../../../config';
import { pruneFields } from '../../../../lib/helpers';
import ProductModel from '../product/product.model';
import { HTTP400Error } from '../../../../lib/utils/httpErrors';
import { ProductColorI, ProductColorModelInterface } from './product_color.interface';

import { Product } from '../product/product.schema';
import { ProductInterface } from '../product/product.interface';
import { ProductColor } from './product_color.schema';

class ProductColorModel {
    public async createProductColor(data: ProductColorI & { catalogueId: Types.ObjectId; filterKey: string }) {
        let productData: Partial<ProductInterface> = {};

        console.log('data', data);
        const color: ProductColorModelInterface = new ProductColor(data);
        if (data.parentId) {
            let colors: Types.ObjectId[] = [];

            colors.push(color._id);
            productData = {
                colors: colors,
                _id: data.parentId,
            };

            if (data.photos) {
                productData.identificationPhoto = data.photos[0];
            }

            // if (data.filterKey) {
            //     let query: Object = {};
            //     query[data.filterKey as string] = data.color;
            //     productData['$push'] = query;
            // }

            color.parentId = data.parentId;
            pruneFields(data, 'catalogueId shopId parentId photos');
            productData = { ...data, ...productData };
            console.log('product data', productData);
            const item = await ProductModel.updateProduct(productData);
        } else {
            productData = {
                colors: [color._id],
                shopId: data.shopId,
                parentId: data.catalogueId,
                identificationPhoto: data.photos[0],
            };
            // if (data.filterKey) {
            //     productData[data.filterKey as string] = [data.color];
            // }
            pruneFields(data, 'catalogueId shopId parentId photos');
            productData = { ...data, ...productData };
            const product = await ProductModel.createProduct(productData);
            color.parentId = product._id;
        }

        console.log('color', color);
        await color.save();
        return { colorId: color._id, productId: color.parentId };
    }

    public async updateProductColor(data: Partial<ProductColorModelInterface> & { parentData: any }) {
        const exist = await ProductColor.findById(data._id).lean();
        if (exist) {
            let productColor: UpdateQuery<ProductColorModelInterface> | undefined = {};

            if (data.sizes) {
                productColor['$push'] = { sizes: { $each: data.sizes } };
                pruneFields(data, 'sizes');
            }

            if (data.photos) {
                console.log('parent', exist);
                if (exist.parentId) {
                    let productChange = {
                        _id: exist.parentId,
                        identificationPhoto: data.photos[0],
                    };

                    if (data.photos) await ProductModel.updateProduct(productChange);
                } else {
                    throw new HTTP400Error('Parent id not found');
                }
            }

            productColor = { ...productColor, ...data };
            console.log(productColor, data, 'ssize creation');
            return (await ProductColor.findByIdAndUpdate(data._id, productColor, { new: true }))?._id;
        } else {
            throw new HTTP400Error('Product color does not exist.');
        }
    }

    public async deleteProductColor(data: IId & { parentId?: string }) {
        const exist: ProductColorModelInterface | null = await ProductColor.findById(data._id).populate({
            path: 'color',
            populate: {
                path: 'parent',
                select: 'key',
            },
        });
        if (exist) {
            if (data.parentId) {
                let query = {};
                query['colors'] = data._id;
                query[exist.color.parent.key] = exist.color._id;
                const response = await Product.findByIdAndUpdate(data.parentId, { $pull: query }, { new: true });
                console.log('Respnse', response, exist, query);
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
