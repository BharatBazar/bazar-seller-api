import { Types } from 'mongoose';
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

            await create.save();
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
            } else if (exist.categoryType == categoryType.SubCategory1) {
                await Promise.all([
                    await ProductCatalogue.findByIdAndUpdate(exist.parent, { $pull: { child: exist._id } }),
                    await ProductCatalogue.findByIdAndDelete(exist._id),
                ]);
                return 'Deleted';
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

    private async checkAndActicateCatalogueItem(exist: IProductCatalogueModel) {
        const categoryList: IProductCatalogueModel | null = await ProductCatalogue.findById(exist._id).populate({
            path: 'child',
            select: 'active',
        });

        if (exist.subCategoryExist && exist.child.length > 0) {
            let flag = categoryList.child.some((child) => child.active);
            if (flag) {
                await ProductCatalogue.findByIdAndUpdate(exist._id, { active: !exist.active });
                return 'Catalogue item activated';
            } else {
                throw new HTTP400Error('Catalogue does not have any active child and child exist.');
            }
        } else if (!exist.subCategoryExist) {
            await ProductCatalogue.findByIdAndUpdate(exist._id, { active: !exist.active });
            return 'Catalogue item activated';
        } else {
            throw new HTTP400Error(
                'Catalogoue item cannot be activated since it no child has been added but child exist.',
            );
        }
    }

    public async ActivateCatalogue(data: { _id: Types.ObjectId; activate: boolean }) {
        const exist = await ProductCatalogue.findById(data._id);
        if (exist) {
            return await this.checkAndActicateCatalogueItem(exist);
        } else {
            throw new HTTP400Error('Catalogue item does not exist please add product in order to update it.');
        }
    }
}

export default new ProductCatalogueModel();
