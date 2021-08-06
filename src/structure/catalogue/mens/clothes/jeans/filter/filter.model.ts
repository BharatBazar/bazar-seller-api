import { ObjectId } from '../../../../../../datatypes/index';
import { Types } from 'mongoose';
import { IClassfier } from '../classifiers/classifier.interface';
import { HTTP400Error, HTTP404Error } from '../../../../../../lib/utils/httpErrors';
import { IFilter, IFilterModel } from './filter.interface';
import { Filter } from './filter.schema';

class FilterModel {
    public filterExist = async (name: string, type: string) => {
        const exist = Filter.findOne({ $or: [{ name }, { type: type }] }).countDocuments();
        return exist;
    };

    public createFilter = async (data: IFilterModel) => {
        if (!data.type || !data.name) {
            throw new HTTP400Error('Please provide all fields to create filter');
        }
        const exist = await this.filterExist(data.name, data.type);
        if (exist) {
            throw new HTTP400Error('Filter already exist with either same name or same type');
        } else {
            const filter = new Filter(data);
            await filter.save();
            return filter;
        }
    };

    public getAllClassifier = async () => {
        return ['pattern', 'size', 'brand', 'color', 'fit'];
    };

    public deleteFilter = async (data: IFilterModel) => {
        const exist = await Filter.findById(data._id);
        if (exist) {
            await Filter.findByIdAndDelete(data._id);
            return 'Deleted';
        } else {
            throw new HTTP400Error('Filter does not exist');
        }
    };

    public getFilter = async () => {
        this.getAllFilterWithValue();
        return await Filter.find();
    };

    public updateFilter = async (data: IFilterModel & { _id: Types.ObjectId }) => {
        if (data.type) {
            throw new HTTP400Error('Type cannot be edited once filter is created.');
        }
        const exist = await Filter.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Filter updated';
        } else {
            throw new HTTP404Error('Filter not found!');
        }
    };

    public getAllFilterWithValue = async () => {
        const filterWithValue: { values: IClassfier }[] = await Filter.aggregate([
            {
                $lookup: {
                    from: 'jeansclassifiers',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'values',
                },
            },
        ]);

        return {
            filter: filterWithValue.filter((filter: IFilter) => filter.distributionLevel == 0),
            distribution: filterWithValue
                .filter((filter: IFilter) => filter.distributionLevel > 0)
                .sort((a, b) => a.distributionLevel - b.distributionLevel),
        };
    };
}

export default new FilterModel();
