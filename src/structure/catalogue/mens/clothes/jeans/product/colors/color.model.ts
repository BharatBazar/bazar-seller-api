import { UpdateQuery, Types } from 'mongoose';
import { IId } from '../../../../../../../config';
import { pruneFields } from '../../../../../../../lib/helpers';
import JeansModel from '../product/product.model';
import { HTTP400Error } from '../../../../../../../lib/utils/httpErrors';
import { IJeansColorModel } from './color.interface';
import { JeansColor } from './color.schema';
import { Jeans } from '../product/product.schema';

class JeansColorModel {
    public async createJeansColor(data: IJeansColorModel) {
        console.log(data);
        if (data.parentId) {
            let colors: [Types.ObjectId] = [];
            const color: IJeansColorModel = new JeansColor(data);
            colors.push(color._id);
            const item = await JeansModel.updateJeans({ colors, _id: data.parentId });

            color.parentId = data.parentId;

            await color.save();
            return { colorId: color._id, productId: color.parentId };
        } else {
            const color: IJeansColorModel = new JeansColor(data);
            const jeans = await JeansModel.createJeans({ colors: [color._id], shopId: data.shopId });

            await color.save();
            return { colorId: color._id, productId: jeans._id };
        }
    }

    public async updateJeansColor(data: Partial<IJeansColorModel>) {
        const exist = (await JeansColor.findById(data._id).countDocuments()) > 0;
        if (exist) {
            let jeansColor: UpdateQuery<IJeansColorModel> | undefined = {};
            if (data.sizes) {
                jeansColor['$push'] = { sizes: { $each: data.sizes } };
                pruneFields(data, 'sizes');
            }

            jeansColor = { ...jeansColor, ...data };
            console.log(jeansColor, data);
            return (await JeansColor.findByIdAndUpdate(data._id, jeansColor, { new: true }))?._id;
        } else {
            throw new HTTP400Error('Jeans color does not exist.');
        }
    }

    public async deleteJeansColor(data: IId & { parentId?: string }) {
        const exist: IJeansColorModel | null = await JeansColor.findById(data._id);
        if (exist) {
            if (data.parentId) {
                await Jeans.findByIdAndUpdate(data.parentId, { $pull: { colors: data._id } });
            }
            await exist.delete();
            return '';
        } else {
            throw new HTTP400Error('Jeans color does not exist.');
        }
    }

    public async getJeansColor(data: IId) {
        const exist = (await JeansColor.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await JeansColor.findById(data._id).populate({ path: 'jeansSize' });
        } else {
            throw new HTTP400Error('Jeans size does not found.');
        }
    }
}

export default new JeansColorModel();
