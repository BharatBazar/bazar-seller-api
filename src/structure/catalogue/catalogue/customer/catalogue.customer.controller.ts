import ResponseHandler from '../../../../lib/helpers/responseHandler';
import catalogueCustomerModel from './catalogue.customer.model';

class CatalogueCustomerController {
    public async GetProductCatalogue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('All the products', await catalogueCustomerModel.GetProductCatalogue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new CatalogueCustomerController();
