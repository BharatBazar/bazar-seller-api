import { HTTP400Error } from './../../../../../../lib/utils/httpErrors';
import { IFilterModel } from './filter.interface';
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
        const filterWithValue = await Filter.aggregate([
            {
                $lookup: {
                    from: 'jeansclassifiers',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'values',
                },
            },
        ]);

        return filterWithValue;
    };
}

export default new FilterModel();
