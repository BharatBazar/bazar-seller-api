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

            await Jeans.findByIdAndUpdate(data._id, jeans, { new: true });
            return '';
        } else {
            throw new HTTP404Error('Jeans not found.');
        }
    }

    public async deleteJeansFilter(data: { _id: Types.ObjectId; filter: any }) {
        let exist: boolean = await this.jeansIdExist(data._id);
        if (exist) {
            let jeans: UpdateQuery<IJeansModel> | undefined = {};
            console.log(data);
            jeans['$pull'] = { ...data.filter };
            await Jeans.findByIdAndUpdate(data._id, jeans, { new: true });
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
}

export default new JeansModel();
