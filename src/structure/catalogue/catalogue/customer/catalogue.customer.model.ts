import { IProductCatalogue } from '../productCatalogue.interface';
import { ProductCatalogue } from '../productCatalogue.schema';

class CatalogueCustomerModel {
    public async GetProductCatalogue(param: IProductCatalogue) {
        let query = typeof param != 'object' ? {} : param;
        console.log('Query', query, param);
        const data = await ProductCatalogue.find({ active: true, child: [] }).select(
            'customer_name customer_image customer_description type',
        );

        console.log('DATA', query, data.length);

        return data;
    }
}

export default new CatalogueCustomerModel();
