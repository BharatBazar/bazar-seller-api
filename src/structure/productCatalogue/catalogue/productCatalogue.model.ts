import { HTTP400Error } from './../../../lib/utils/httpErrors';
import { HTTP400Error } from '../../../lib/utils/httpErrors';
import { categoryType, IProductCatalogue, IProductCatalogueModel } from './productCatalogue.interface';
import { ProductCatalogue } from './productCatalogue.schema';
class ProductCatalogueModel {
    public async AddProductCatalogue(data: IProductCatalogue) {
        if (await ProductCatalogue.findOne({ name: data.name, categoryType: data.categoryType, parent: data.parent })) {
            throw new HTTP400Error('Product already exist please call update api.');
        } else {
            const create = new ProductCatalogue(data);
            if (data.categoryType != categoryType.Category) {
                if (data.parent) {
                    const parent = await ProductCatalogue.findByIdAndUpdate(data.parent, {
                        $push: { child: create._id },
                    });
                    if (!parent) {
                        throw new HTTP400Error('Parent not found');
                    }
                } else {
                    throw new HTTP400Error('Please provide parent id.');
                }
            }

            create.save();
            return create;
        }
    }

    public async DeleteProductCatalogue(data: IProductCatalogueModel) {
        const exist: IProductCatalogueModel | null = await ProductCatalogue.findById(data._id);
        if (exist) {
            if (exist.categoryType == categoryType.Category) {
                const allItem = await ProductCatalogue.find({ parent: exist._id });
                let deletePromises = allItem.map(
                    (item) =>
                        new Promise(async (resolve) => {
                            resolve(await ProductCatalogue.deleteMany({ parent: item._id }));
                        }),
                );
                await Promise.all([...deletePromises, await ProductCatalogue.findByIdAndDelete(exist._id)]);

                return 'Deleted';
            } else if (exist.categoryType == categoryType.SubCategory) {
                await Promise.all([
                    await ProductCatalogue.deleteMany({ parent: exist._id }),
                    await ProductCatalogue.findByIdAndUpdate(exist.parent, { $pull: { child: exist._id } }),
                    await ProductCatalogue.findByIdAndDelete(exist._id),
                ]);
                return 'Deleted';
            } else {
                throw new HTTP400Error('Subcategory deletion logic not added yet');
            }
        } else {
            throw new HTTP400Error('Category deleted!1');
        }
    }

    public async GetProductCatalogue(query: IProductCatalogue) {
        const data = await ProductCatalogue.find(query).populate({ path: 'parent child', select: 'name' });
        return data;
    }

    public async UpdateProductCatalogue(data: IProductCatalogue) {
        console.log('uopdate data =>', data);
        if ('activate' in data) {
            throw new HTTP400Error('Cannot activate catelogue item from this api.');
        } else {
            if (!(await ProductCatalogue.ProductExist(data._id))) {
                throw new HTTP400Error('Product does not exist please add product in order to update it.');
            } else {
                return await ProductCatalogue.findByIdAndUpdate(data._id, data, { new: true });
            }
        }
    }
}

export default new ProductCatalogueModel();
