import { Types } from 'mongoose';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IFilterValuesModel } from './filtervalues.interface';
import { FilterValues } from './filtervalues.schema';

class FilterValuesModel {
    public filterValuesExist = async (name: string, parent: string, type: string) => {
        const exist = await FilterValues.findOne({ name, parent }).countDocuments();
        //     const exist = await FilterValues.find({ parent:parent })
        //     console.log("EXIIIIS",exist)

        //    const y = exist.map((e)=>{
        //         return e.type===type ?true :false
        //     })
        //    return y
        return exist;
    };
    public createFilterValues = async (data: IFilterValuesModel) => {
        const exist = await this.filterValuesExist(data.name, data.parent, data.type);
        if (exist) {
            throw new HTTP400Error('Filter item already exist or have written same type');
        } else {
            const filterValues = new FilterValues(data);
            await filterValues.save();
            return filterValues;
        }
    };

    public deleteFilterValues = async (data: IFilterValuesModel) => {
        const exist = await FilterValues.findById(data._id);
        if (exist) {
            await FilterValues.findByIdAndDelete(data._id);
        } else {
            throw new HTTP400Error('Filter item does not exist');
        }
    };

    public getFilterValues = async (data: IFilterValuesModel) => {
        return await FilterValues.find(data);
    };

    public updateFilterValues = async (data: IFilterValuesModel & { _id: Types.ObjectId }) => {
        const exist = await FilterValues.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Filter item updated';
        } else {
            throw new HTTP404Error('Filter item not found!');
        }
    };

    public activateFilter = async (data: { _id: Types.ObjectId; active: boolean }) => {
        try {
            const filterValues = await FilterValues.findByIdAndUpdate(data._id, { active: data.active });
            return data.active ? 'Classfier activated' : 'Classfier deactivated';
        } catch (error) {
            throw new HTTP400Error('Filter does not exist');
        }
    };
}

export default new FilterValuesModel();
