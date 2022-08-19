import { paginationConfig } from './../../../../config/index';
import { pruneFields } from './../../../../lib/helpers/index';
import { IProductModelG, ProductInterface, productStatus, statusDescription, statusName } from './product.interface';
import { UpdateQuery, Types } from 'mongoose';
import { IProductModel } from './product.interface';
import { Product } from './product.schema';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';

class ProductModel {
    public async createProduct(data: Partial<ProductInterface>) {
        if (!data.shopId) {
            throw new HTTP400Error('Incomplete data');
        } else if (!data.parentId) {
            throw new HTTP400Error('Incomplete data');
        } else {
            const product = new Product(data);
            await product.save();
            return product;
        }
    }

    private async productIdExist(_id: Types.ObjectId) {
        const exist = (await Product.findById(_id).countDocuments()) > 0;
        return exist;
    }

    public async updateProduct(data: ProductInterface) {
        const exist: boolean = await this.productIdExist(data._id);
        if (exist) {
            let product: UpdateQuery<IProductModel> | undefined = {};
            if (data.colors) {
                product['$push'] = { colors: { $each: data.colors } };
                pruneFields(data, 'colors');
            }

            product = { ...product, ...data };

            return await Product.findByIdAndUpdate(data._id, product, { new: true });
        } else {
            throw new HTTP404Error('Product not found.');
        }
    }

    public async deleteProductFilter(data: { _id: Types.ObjectId; filter: any; multiple: boolean }) {
        let exist: boolean = await this.productIdExist(data._id);
        if (exist) {
            let product: UpdateQuery<IProductModel> | undefined = {};

            if (data.multiple) product['$pull'] = { ...data.filter };
            else {
                product[Object.keys(data.filter)[0]] = undefined;
            }
            const b = await Product.findByIdAndUpdate(data._id, product, { new: true });
            console.log(b);
            return '';
        } else {
            throw new HTTP404Error('Product not found');
        }
    }

    public async deleteProduct(data: ProductInterface) {
        const exist: IProductModelG | null = await Product.findById(data._id);
        if (exist) {
            await exist.delete();
            return '';
        } else {
            throw new HTTP404Error('Product not found.');
        }
    }

    public async getProduct(data: ProductInterface) {
        const exist = await this.productIdExist(data._id);
        if (exist) {
            let dataToSend = await Product.findById(data._id).populate({
                path: 'colors',
                populate: [
                    {
                        path: 'color',
                    },
                    {
                        path: 'sizes',
                        populate: [
                            {
                                path: 'size',
                            },
                        ],
                    },
                ],
            });
            console.log(dataToSend);
            return dataToSend;
        } else {
            throw new HTTP400Error('Product not found.');
        }
    }

    public async getProductMeta(query: { query: { productStatus: productStatus }; lastTime: string }) {
        if (!query.query) {
            throw new HTTP400Error('No query available');
        }

        let condition: any = {};
        if (query.lastTime) {
            const dateObj = new Date(parseInt(query.lastTime, 10));
            condition.createdAt = { $lt: dateObj };
        }
        const searchCount = await Product.countDocuments({ $and: [query.query, condition] });
        console.log(query, searchCount);
        const data: IProductModelG[] =
            searchCount > 0
                ? await Product.find({ $and: [condition, query.query] })
                      .sort('-createdAt')
                      .limit(paginationConfig.MAX_PRODUCT)
                      .select('shopId createdAt')
                      .populate({
                          path: 'shopId',
                          select: 'shopName',
                          populate: {
                              path: 'owner city area',
                              select: 'firstName lastName name',
                          },
                      })
                : [];

        const lastTime = data.length > 0 ? data[data.length - 1].createdAt.getTime() : undefined;

        return {
            payload: data,
            searchCount,
            lastTime,
            maxCount: paginationConfig.MAX_PRODUCT,
        };
    }

    private provideSelectString = (status: productStatus) => {
        if (status == productStatus.REJECTED || status == productStatus.LIVE) {
            return 'colors';
        }
    };

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
                      .populate({
                          path: 'colors',
                          populate: {
                              path: 'color',

                              select: 'description name',
                          },
                          select: 'color',
                      })
                : [];

        const lastTime = data.length > 0 ? data[data.length - 1].createdAt.getTime() : undefined;

        return {
            payload: data,
            searchCount,
            lastTime,
            maxCount: paginationConfig.MAX_PRODUCT,
        };
    };

    public provideStatus = async ({ shopId }: { shopId: string }) => {
        if (!shopId) {
            throw new HTTP400Error('Please provide shopid');
        }

        var a: { _id: number; count: number }[] = await Product.aggregate([
            {
                $match: { shopId: Types.ObjectId(shopId) },
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                },
            },
        ]);

        console.log(await Product.find());

        const b = a.map((item) => {
            return { ...item, name: productStatus[item._id] };
        });
        console.log(b, a, shopId);
        console.log(Object.keys(statusDescription));
        return [
            productStatus.LIVE,
            productStatus.WAITINGFORAPPROVAL,
            productStatus.INVENTORY,

            productStatus.REJECTED,
            productStatus.OUTOFSTOCK,
        ].map((status) => {
            let index = a.findIndex((item) => item._id == status);
            if (index > -1) {
                let c = a[index];
                return {
                    ...c,
                    name: statusName[c._id] + ` ( ${c.count.toString()} )`,
                    description: statusDescription[status],
                };
            } else {
                return {
                    _id: status,
                    name: statusName[status] + ' ( 0 )',
                    description: statusDescription[status],
                    count: 0,
                };
            }
        });
    };
}

export default new ProductModel();
