import { ObjectId } from '../../../../datatypes/index';
import { Types } from 'mongoose';
import { IClassfier, IClassifierModel } from '../filtervalues/filtervalues.interface';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IFilter, IFilterModel } from './filter.interface';
import { Filter } from './filter.schema';
import { filter } from 'compression';
import { Classifier } from '../filtervalues/filtervalues.schema';
import productCatalogueModel from '../../catalogue/productCatalogue.model';
import { Shop } from '../../../shop/shop.schema';

class FilterModel {
    public filterExist = async (key: string) => {
        // const exist = Filter.findOne({ $or: [{ name }, { type: type }] }).countDocuments();
        const exist = await Filter.findOne({ key: key });
        return exist;
    };

    public createFilter = async (data: IFilterModel) => {
        if (!data.type || !data.name) {
            throw new HTTP400Error('Please provide all fields to create filter');
        }
        const exist = await this.filterExist(data.key);

        if (exist) {
            throw new HTTP400Error('A Filter already exist with same key');
        } else {
            const filter: IFilterModel = new Filter(data);
            await productCatalogueModel.UpdateProductCatalogue({ _id: filter.parent, $inc: { totalFilterAdded: 1 } });
            await filter.save();
            return filter;
        }
    };

    public activateFilter = async (data: { _id: Types.ObjectId; active: boolean }) => {
        const exist = await Filter.findById(data._id);
        if (exist) {
            const filterItem: IClassifierModel[] = await Classifier.find({ parent: exist._id });
            if (filterItem.length == 0) {
                throw new HTTP400Error('No items in the filter');
            } else {
                const flag = filterItem.some((item) => item.active);
                if (flag) {
                    await Filter.findByIdAndUpdate(data._id, { active: data.active });
                    return data.active ? 'Filter activated' : 'Filter deactivated';
                } else {
                    throw new HTTP400Error('None of the filter item is activated');
                }
            }
        } else {
            throw new HTTP400Error('Filter does not exist');
        }
    };

    public getAllClassifier = async () => {
        return ['pattern', 'size', 'brand', 'color', 'fit'];
    };

    public deleteFilter = async (data: IFilter) => {
        const exist = await Filter.findById(data._id);
        if (exist) {
            if (data.parent) {
                if (await productCatalogueModel.CatalogueExistOrNot(data.parent)) {
                    if (data.key) {
                        let fieldName = `${data.key}`;
                        await Promise.all([
                            await productCatalogueModel.UpdateProductCatalogue({
                                _id: data.parent,
                                $inc: { totalFilterAdded: -1 },
                            }),
                            await Shop.updateMany({}, { $unset: { fieldName: 1 } }),
                            await Classifier.deleteMany({ parent: exist._id }),
                            await Filter.findByIdAndDelete(data._id),
                        ]);
                        return 'Deleted';
                    } else {
                        throw new HTTP400Error('Key does not exist');
                    }
                } else {
                    throw new HTTP400Error('Parent does not exist');
                }
            } else {
                throw new HTTP400Error('Filter parent not provided');
            }
        } else {
            throw new HTTP400Error('Filter does not exist');
        }
    };

    public getFilter = async () => {
        //  this.getAllFilterWithValue();
        return await Filter.find();
    };

    public updateFilter = async (data: IFilterModel & { _id: Types.ObjectId }) => {
        if (data.type) {
            delete data['type'];
        }
        const exist = await Filter.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Filter updated';
        } else {
            throw new HTTP404Error('Filter not found!');
        }
    };

    public getAllFilterWithValue = async (condition: Partial<IFilter>) => {
        console.log(condition);
        const filterWithValue: { values: IClassfier }[] = await Filter.aggregate([
            { $match: condition ? condition : {} },
            // { $match: {'parent':condition.parent}  },
            {
                $lookup: {
                    from: 'filtervalues',
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'values',
                },
            },
        ]);
        console.log('Filter =>', filterWithValue);
        return {
            filter: filterWithValue.filter((filter: IFilter) => filter.filterLevel == 0),
            distribution: filterWithValue
                .filter((filter: IFilter) => filter.filterLevel > 0)
                .sort((a, b) => a.filterLevel - b.filterLevel),
        };
    };
}

export default new FilterModel();
