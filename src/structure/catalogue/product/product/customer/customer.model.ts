import { HTTP400Error } from './../../../../../lib/utils/httpErrors';
import { Types } from 'mongoose';
import { productStatus } from '../product.interface';
import { ProductSize } from '../../product_size/product_size.schema';
import { Product } from '../product.schema';
import { Shop } from '../../../../shop/shop.schema';

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

    public async getItemsOnApplyingFilter(data: {
        colors: [string];
        size: [string];
        shop: boolean;
        status: productStatus;
        parentId: string;
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
            return await Product.find({
                status: data.status,
                parentId: new Types.ObjectId(data.parentId),
                mens_jeans_color: { $in: data.mens_jeans_color },
                // ...data,
            }).populate({
                path: 'colors',
                populate: {
                    path: 'color',
                    select: 'name description',
                },
            });
        }
    }
}

export default new CustomerModel();
