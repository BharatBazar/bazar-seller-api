import { ObjectId } from './../../../../datatypes/index';

import { FilterQuery, Types, _FilterQuery } from 'mongoose';
import { IClassfier, IFilterValuesModel } from '../filtervalues/filtervalues.interface';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IFilter, IFilterModel } from './filter.interface';
import { Filter } from './filter.schema';
import { FilterValues } from '../filtervalues/filtervalues.schema';
import productCatalogueModel from '../../catalogue/seller/productCatalogue.model';
import { Shop } from '../../../shop/shop.schema';

import { Product } from '../../product/product/product.schema';
import { IShopModel } from '../../../shop/shop.interface';

class FilterModel {
    public filterExist = async (key: string) => {
        // const exist = Filter.findOne({ $or: [{ name }, { type: type }] }).countDocuments();
        const exist = await Filter.findOne({ key: key });
        return exist;
    };

    public createFilter = async (data: IFilterModel) => {
        if (!data.key || !data.name) {
            throw new HTTP400Error('Please provide all fields to create filter');
        }
        const exist = await this.filterExist(data.key);

        if (exist) {
            throw new HTTP400Error('A Filter already exist with same key');
        } else {
            const filter: IFilterModel = new Filter(data);
            await filter.save();
            return filter;
        }
    };

    public activateFilter = async (data: { _id: Types.ObjectId; active: boolean }) => {
        if (data._id) {
            const exist: IFilter | null = await Filter.findById(data._id)
                .select('active filterActivatedCount parent')
                .lean();

            const activateFilterFunction = async (exist: IFilter) => {
                if (exist.filterActivatedCount == 0) {
                    await productCatalogueModel.UpdateProductCatalogue({
                        _id: exist.parent,
                        $inc: { totalFilterAdded: 1 },
                    });
                }
                await Filter.findByIdAndUpdate(data._id, {
                    active: data.active,
                    $inc: { filterActivatedCount: 1 },
                });

                return data.active ? 'Filter activated' : 'Filter deactivated';
            };

            if (exist) {
                const filterItem: IFilterValuesModel[] = await FilterValues.find({ parent: exist._id }).lean();

                if (filterItem.length == 0) {
                    throw new HTTP400Error('No items in the filter');
                } else {
                    if (exist.filterActivatedCount == 0) {
                        const checkKeyExistQuery: FilterQuery<IShopModel> = {};
                        checkKeyExistQuery[exist.key] = { $eq: null };
                        const doFilterKeyExistInShopSchema = !(
                            (await Shop.find({}).countDocuments()) ==
                            (await Shop.find(checkKeyExistQuery).countDocuments())
                        );
                        if (doFilterKeyExistInShopSchema) {
                            const doFilterKeyExistInProductSchema = !(
                                (await Product.find({}).countDocuments()) ==
                                (await Product.find(checkKeyExistQuery).countDocuments())
                            );
                            if (doFilterKeyExistInProductSchema) {
                                const flag = filterItem.some((item) => item.active);
                                if (flag) {
                                    activateFilterFunction(exist);
                                } else {
                                    throw new HTTP400Error('Filter key does not exist in product schema');
                                }
                            } else {
                                throw new HTTP400Error('Filter key does not exist in shop schema');
                            }
                        } else {
                            throw new HTTP400Error('None of the filter item is activated');
                        }
                    } else {
                        activateFilterFunction(exist);
                    }
                }
            } else {
                throw new HTTP400Error('Filter does not exist');
            }
        } else {
            throw new HTTP400Error('Provide correct data');
        }
    };

    public getAllFilterValues = async () => {
        return ['pattern', 'size', 'brand', 'color', 'fit'];
    };

    public deleteFilter = async (data: IFilter) => {
        const exist = await Filter.findById(data._id);
        if (exist) {
            if (exist.parent) {
                if (await productCatalogueModel.CatalogueExistOrNot(exist.parent)) {
                    if (exist.key) {
                        const unsetField = {};
                        unsetField[exist.key] = 1;

                        if (await Shop.find({ $exist: unsetField })) {
                            let filterProvidedForSellingItems = {};
                            filterProvidedForSellingItems[exist.key] = -1;
                            await Shop.updateMany({ $inc: { filterProvidedForSellingItems } });
                        }
                        await Promise.all([
                            await productCatalogueModel.UpdateProductCatalogue({
                                _id: exist.parent,
                                $inc: { totalFilterAdded: -1 },
                            }),
                            await Shop.updateMany({}, { $unset: unsetField }),
                            await FilterValues.deleteMany({ parent: exist._id }),
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
                throw new HTTP400Error('Filter parent not providedd');
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

        //console.log("response",response)
        const exist = await Filter.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Filter updated';
        } else {
            throw new HTTP404Error('Filter not found!');
        }
    };

    public getFiltersAndValueForAShop = async (condition: { active: boolean; parentId: string; shopId: string }) => {
        console.log('Condition', typeof condition, typeof condition.parentId);
        if (condition.parentId) {
            if (condition.shopId) {
                const filters = await Filter.find({ active: true, parent: condition.parentId }).lean();
                if (filters.length != 0) {
                    let key = filters.reduce((ac, cv) => ac + cv.key + ' ', '');
                    key = key.trim();

                    const filterValues = await Shop.findById(condition.shopId, key)
                        .populate({
                            path: key,
                        })
                        .lean();

                    filters.forEach((item) => (item['values'] = filterValues[item.key]));
                    return {
                        filter: filters.filter((filter: IFilter) => filter.filterLevel == 0),
                        distribution: filters
                            .filter((filter: IFilter) => filter.filterLevel > 0)
                            .sort((a, b) => a.filterLevel - b.filterLevel),
                    };
                } else {
                    throw new HTTP400Error('No filter found');
                }
            } else {
                throw new HTTP400Error('Shop id not found');
            }
        } else {
            throw new HTTP400Error('Parent id not found');
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
        //console.log('Filter =>', filterWithValue);
        return {
            filter: filterWithValue.filter((filter: IFilter) => filter.filterLevel == 0),
            distribution: filterWithValue
                .filter((filter: IFilter) => filter.filterLevel > 0)
                .sort((a, b) => a.filterLevel - b.filterLevel),
        };
    };

    /*
     * This is created for admin dashboard
     * on filter page when all filter is needed
     * without any distribution on filterLevel
     */

    public getFiltersDashboard = async (condition: Partial<IFilter>) => {
        return Filter.find(condition || {});
    };
}

export default new FilterModel();
