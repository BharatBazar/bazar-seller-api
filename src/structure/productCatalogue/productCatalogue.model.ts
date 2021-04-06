import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductCatalogue } from './productCatalogue.interface';
import { ProductCatalogue } from './productCatalogue.schema';
class ProductCatalogueModel {
    public async AddProductCatalogue(data: IProductCatalogue) {
        if (await ProductCatalogue.ProductExist(data._id)) {
            throw new HTTP400Error('Product already exist please call update api.');
        } else {
            const create = new ProductCatalogue(data);
            create.save();
            return create;
        }
    }

    public async GetProductCatalogue() {
        return await ProductCatalogue.find();
    }

    public async UpdateProductCatalogue(data: IProductCatalogue) {
        console.log(data);
        if (!(await ProductCatalogue.ProductExist(data._id))) {
            throw new HTTP400Error('Product does not exist please add product in order to update it.');
        } else {
            return await ProductCatalogue.findByIdAndUpdate(data._id, data, { new: true });
        }
    }
}

export default new ProductCatalogueModel();
