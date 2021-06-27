import { IClassfier } from './../classifiers/classifier.interface';
import { HTTP400Error } from './../../../../../../lib/utils/httpErrors';
import { IFilter, IFilterModel } from './filter.interface';
import { Filter } from './filter.schema';

class FilterModel {
    public filterExist = async (name: string) => {
        const exist = Filter.findOne({ name }).countDocuments();
        return exist;
    };

    public createFilter = async (data: IFilterModel) => {
        const exist = await this.filterExist(data.name);
        if (exist) {
            throw new HTTP400Error('Filter already exist');
        } else {
            const filter = new Filter(data);
            await filter.save();
            return filter;
        }
    };

    public getFilter = async () => {
        this.getAllFilterWithValue();
        return await Filter.find();
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
