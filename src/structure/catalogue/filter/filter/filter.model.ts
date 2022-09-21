import { Types, FilterQuery } from 'mongoose';
import { IClassfier, IFilterValuesModel } from '../filtervalues/filtervalues.interface';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IFilter, IFilterModel } from './filter.interface';
import { Filter } from './filter.schema';
import { FilterValues } from '../filtervalues/filtervalues.schema';
import productCatalogueModel from '../../catalogue/productCatalogue.model';
import { Shop } from '../../../shop/shop.schema';
import { ProductCatalogue } from '../../catalogue/productCatalogue.schema';
import { IShopModel } from '../../../shop/shop.interface';
import { Product } from '../../product/product/product.schema';

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

            // let addFieldInSchema = {};
            // let indexes = {};
            // indexes['parentId'] = 1;
            // indexes['shopId'] = 1;
            // indexes['status'] = 1;
            // indexes[data.key] = 1;

            // addFieldInSchema[data.key] = { type: [Types.ObjectId], ref: 'FilterValues' };

            // console.log('addFieldIn', addFieldInSchema, indexes);
            // await Product.schema.add(addFieldInSchema);

            // await Product.schema.clearIndexes(indexes);

            await filter.save();
            return filter;
        }
    };

    public activateFilter = async (data: { _id: Types.ObjectId; active: boolean }) => {


        const exist:IFilter | null= await Filter.findById(data._id).lean();


        console.log("exist ",exist)
        if (exist) {
            const filterItem: IFilterValuesModel[] = await FilterValues.find({ parent: exist._id });
console.log("filter",filterItem)
            if (filterItem.length === 0) {
                throw new HTTP400Error('No items in the filter');
            } else {
               
                const flag = filterItem.some((item) => item.active);
              

                if (flag == true) {
                    // const checkKeyExistQuery:FilterQuery<IShopModel>  = {};
                    // checkKeyExistQuery[`reandom`] = { $exists: true,"$ne": null}

                    // const doFilterKeyExistInShopSchema = await Shop.find(checkKeyExistQuery).countDocuments()>0;

                    // console.log(doFilterKeyExistInShopSchema,await Shop.find({"randomfield":{$ne: null}}).lean(), await Shop.find({ mens_clothes_jeans_color: { '$eq': null } }).countDocuments())
                    // if(doFilterKeyExistInShopSchema) {
                        
                    //     const doFilterKeyExistInProductSchema = await Product.find(checkKeyExistQuery).countDocuments()!=0;
                    //        console.log(doFilterKeyExistInShopSchema,checkKeyExistQuery,doFilterKeyExistInProductSchema, )
                    //     if(doFilterKeyExistInProductSchema) {

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
                //         } else 
                //             throw new HTTP400Error("Filter key does not exist in product schema")

                //   } else 
                //     throw new HTTP400Error("Filter key does not exist in shop schema")
                
                }
                 else {
                    throw new HTTP400Error('None of the filter item is activated');
                }
            }
            
        } else {
            throw new HTTP400Error('Filter does not exist');
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

                        if(await Shop.find({$exist:unsetField})) {
                            await Shop.updateMany({$inc:{filterProvidedForSellingItems[exist.key]:-1}});
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
      //  console.log('Filter =>', filterWithValue);
        return {
            filter: filterWithValue.filter((filter: IFilter) => filter.filterLevel == 0),
            distribution: filterWithValue
                .filter((filter: IFilter) => filter.filterLevel > 0)
                .sort((a, b) => a.filterLevel - b.filterLevel),
        };
    };
}

export default new FilterModel();
