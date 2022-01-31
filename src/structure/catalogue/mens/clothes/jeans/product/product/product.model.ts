import { productStatus, statusDescription, statusName } from './../../../../../product/product.interface';
import { UpdateQuery, Types } from 'mongoose';
import { pruneFields } from '../../../../../../../lib/helpers';
import { IId, paginationConfig } from '../../../../../../../config/index';
import { HTTP404Error, HTTP400Error } from '../../../../../../../lib/utils/httpErrors';
import { IJeansModel } from './product.interface';
import { Jeans } from './product.schema';

class JeansModel {
    public async createJeans(data: IJeansModel) {
        const jeans = new Jeans(data);
        await jeans.save();
        return jeans;
    }

    private async jeansIdExist(_id: Types.ObjectId) {
        const exist = (await Jeans.findById(_id).countDocuments()) > 0;
        return exist;
    }

    public async updateJeans(data: Partial<IJeansModel>) {
        const exist: boolean = await this.jeansIdExist(data._id);
        if (exist) {
            let jeans: UpdateQuery<IJeansModel> | undefined = {};
            if (data.colors) {
                jeans['$push'] = { colors: { $each: data.colors } };
                pruneFields(data, 'colors');
            }

            jeans = { ...jeans, ...data };

            return await Jeans.findByIdAndUpdate(data._id, jeans, { new: true });
        } else {
            throw new HTTP404Error('Jeans not found.');
        }
    }

    public async deleteJeansFilter(data: { _id: Types.ObjectId; filter: any; multiple: boolean }) {
        let exist: boolean = await this.jeansIdExist(data._id);
        if (exist) {
            let jeans: UpdateQuery<IJeansModel> | undefined = {};

            if (data.multiple) jeans['$pull'] = { ...data.filter };
            else {
                jeans[Object.keys(data.filter)[0]] = undefined;
            }
            const b = await Jeans.findByIdAndUpdate(data._id, jeans, { new: true });
            console.log(b);
            return '';
        } else {
            throw new HTTP404Error('Jeans not found');
        }
    }

    public async deleteJeans(data: IJeansModel) {
        const exist: IJeansModel | null = await Jeans.findById(data._id);
        if (exist) {
            await exist.delete();
            return '';
        } else {
            throw new HTTP404Error('Jeans not found.');
        }
    }

    public async getJeans(data: IId) {
        const exist = await this.jeansIdExist(data._id);
        if (exist) {
            return await Jeans.findById(data._id).populate({
                path: 'colors brand fit pattern',
                populate: {
                    path: 'sizes color includedColor',

                    populate: {
                        path: 'size',
                    },
                },
            });
        } else {
            throw new HTTP400Error('Jeans not found.');
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
        const searchCount = await Jeans.countDocuments({ $and: [query.query, condition] });
        console.log(query, searchCount);
        const data =
            searchCount > 0
                ? await Jeans.find({ $and: [condition, query.query] })
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

    public getAllJeans = async (query: any) => {
        if (!query.query) {
            throw new HTTP400Error('No query available');
        }

        let condition: any = {};
        if (query.lastTime) {
            const dateObj = new Date(parseInt(query.lastTime, 10));
            condition.createdAt = { $lt: dateObj };
        }

        const searchCount = await Jeans.countDocuments({ $and: [query.query, condition] });

        const data =
            searchCount > 0
                ? await Jeans.find({ $and: [condition, query.query] })
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
            throw new HTTP400Error('please provide shopid');
        }
        console.log('shopid', shopId);

        var a: { _id: number; count: number }[] = await Jeans.aggregate([
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

        const b = a.map((item) => {
            return { ...item, name: productStatus[item._id] };
        });
        //console.log(Object.keys(statusDescription));
        return [
            productStatus.LIVE,
            productStatus.WAITINGFORAPPROVAL,
            productStatus.INVENTORY,
            productStatus.NOTCOMPLETED,
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

export default new JeansModel();
