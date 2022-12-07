import { HTTP400Error } from './../../../../../lib/utils/httpErrors';
import { Types } from 'mongoose';
import { productStatus } from '../product.interface';
import { ProductSize } from '../../product_size/product_size.schema';
import { Product } from '../product.schema';
import { Shop } from '../../../../shop/shop.schema';
import { paginationConfig } from '../../../../../config';

class CustomerModel {
    public async getProductDetailsForCustomer(data: { _id: string }) {
        let a = await Product.findById(data._id).populate([
            {
                path: 'colors',
                populate: [
                    {
                        path: 'sizes',
                        populate: {
                            path: 'size',
                        },
                    },
                    {
                        path: 'color',
                    },
                ],
            },
            {
                path: 'shopId',
                populate: {
                    path: 'owner coOwner area state city',
                },
            },
        ]);
        if (!a) {
            throw new HTTP400Error('Product not found.');
        } else {
            console.log(a, 'a');
            return a;
        }
    }

    public async getShopDetailsForCustomer(data: { _id: string }) {
        let a = await Shop.findById(data._id).populate({
            path: 'owner coOwner area state city',
        });
        if (!a) {
            throw new HTTP400Error('Product not found.');
        } else {
            console.log(a, 'a');
            return a;
        }
    }

    public async getProductAfterApplyingFilter(data: {
        query: {
            lastTime: string;
            parentId: string;
        };
    }) {
        if (!data.query) {
            throw new HTTP400Error('No query available');
        } else {
            let condition: any = {};
            if (data.query.lastTime) {
                const dateObj = new Date(parseInt(data.query.lastTime, 10));
                condition.updatedAt = { $lt: dateObj };
            }
            const searchCount = await Product.countDocuments({ $and: [data.query, condition] });

            const products =
                searchCount > 0
                    ? await Product.find({
                          parentId: new Types.ObjectId(data.query.parentId),
                          ...data,
                      })
                          .populate({
                              path: 'colors',
                              populate: {
                                  path: 'color',
                                  select: 'name description',
                              },
                          })
                          .sort('-updatedAt')
                          .limit(paginationConfig.MAX_PRODUCT)
                    : [];

            const lastTime = products.length > 0 ? products[products.length - 1].updatedAt.getTime() : undefined;

            return {
                payload: data,
                searchCount,
                lastTime,
                maxCount: paginationConfig.MAX_PRODUCT,
            };
        }
    }

    public async getItemsOnApplyingFilter(data: {
        query: {
            lastTime: string;
            parentId: string;
        };
    }) {
        let query = {};

        console.log('data =>', data);
        if (data['size']) {
            console.log('data', data['size']);
            let size = data['size'].map((item) => new Types.ObjectId(item));
            // console.log('size', size);
            // return await ProductSize.find({size:{ $in :  size}})
            return await ProductSize.aggregate([
                { $match: { size: { $in: data['size'].map((item) => new Types.ObjectId(item)) } } },
                { $group: { _id: '$productId', count: { $sum: 1 } } },
                {
                    $lookup: {
                        from: 'product',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'productDetail',
                    },
                },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$productDetail', 0] }, '$$ROOT'] } } },
                { $project: { productDetail: 0 } },
                { $match: { status: data['status'] } },
                {
                    $lookup: {
                        from: 'productcolors',
                        let: { colors: '$colors' },
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$colors'] } } },
                            { $project: { color: 1, _id: 0 } },
                        ],
                        as: 'newcolors',
                    },
                },
                {
                    $addFields: {
                        newcolors1: '$newcolors.color',
                    },
                },
                {
                    $lookup: {
                        from: 'filtervalues',
                        localField: 'newcolors1',
                        foreignField: '_id',
                        as: 'populatedColors',
                    },
                },
                {
                    $addFields: {
                        newcolors2: { name: '$populatedColors.name' },
                    },
                },
                {
                    $project: {
                        newcolors1: 0,
                        populatedColors: 0,
                        newcolors: 0,
                    },
                },
            ]);
        } else if (data.shop) {
            return await Product.aggregate([
                {
                    $group: {
                        _id: '$shopId',
                        count: { $sum: 1 },
                    },
                },
                {
                    $lookup: {
                        from: 'shops',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'shop',
                    },
                },

                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$shop', 0] }, '$$ROOT'] } } },
                { $project: { shop: 0 } },
            ]);
        } else {
            return await this.getProductAfterApplyingFilter(data);
        }
    }
}

export default new CustomerModel();
