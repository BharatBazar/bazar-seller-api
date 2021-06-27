import { HTTP400Error } from './../../../../../../lib/utils/httpErrors';
import { IFilterModel } from './filter.interface';
import { Fitler } from './filter.schema';

class FilterModel {
    public filterExist = async (name: string) => {
        const exist = Fitler.findOne({ name }).countDocuments();
        return exist;
    };

    public createFilter = async (data: IFilterModel) => {
        const exist = await this.filterExist(data.name);
        if (exist) {
            throw new HTTP400Error('Filter already exist');
        } else {
            const filter = new Fitler(data);
            await filter.save();
            return filter;
        }
    };

    public getFilter = async () => {};
}

export default new FilterModel();
