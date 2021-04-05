import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IProductCatalogue } from './productCatalogue.interface';
import { ProductCatalogue } from './productCatalogue.schema';
class ProductCatalogueModel {
    public async AddProductCategory(data: IProductCatalogue) {
        if ((await ProductCatalogue.findById(data._id).countDocuments()) > 0) {
            throw new HTTP400Error('Product already exist please call update api.');
        } else {
            const create = new ProductCatalogue(data);
            create.save();
            return create;
        }
    }
}

export default new ProductCatalogueModel();
