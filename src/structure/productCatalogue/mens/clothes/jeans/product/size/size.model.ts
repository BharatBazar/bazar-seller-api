import { Types } from 'mongoose';
import { IId } from '../../../../../../../config';
import jeansColorModel from '../colors/color.model';
import { JeansColor } from '../colors/color.schema';
import { HTTP400Error } from '../../../../.././../../lib/utils/httpErrors';
import { IJeansSizeModel } from './size.interface';
import { JeansSize } from './size.schema';

class JeansSizeModel {
    public async createJeansSize(data: IJeansSizeModel) {
        if (data.parentId) {
            const size: IJeansSizeModel = new JeansSize(data);
            let sizes: [Types.ObjectId] = [];
            sizes.push(size._id);
            await jeansColorModel.updateJeansColor({ sizes, _id: data.parentId });
            await size.save();
            return size;
        } else {
            throw new HTTP400Error('Please provide parentId.');
        }
    }

    public async updateJeansSize(data: IJeansSizeModel) {
        const exist = (await JeansSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await JeansSize.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            throw new HTTP400Error('Jeans size does not found.');
        }
    }

    public async deleteJeansSize(data: IId & { parentId?: Types.ObjectId }) {
        console.log(data);
        const exist = (await JeansSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            if (data.parentId) {
                await JeansColor.findByIdAndUpdate(data.parentId, { $pull: { sizes: data._id } });
            }
            await JeansSize.findByIdAndDelete(data._id);
            return;
        } else {
            throw new HTTP400Error('Jeans size does not found.');
        }
    }

    public async getJeansSize(data: IId) {
        const exist = (await JeansSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await JeansSize.findById(data._id);
        } else {
            throw new HTTP400Error('Jeans size does not found.');
        }
    }
}

export default new JeansSizeModel();
