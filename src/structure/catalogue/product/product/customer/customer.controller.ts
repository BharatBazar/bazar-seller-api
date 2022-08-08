import { NextFunction } from 'express';
import ResponseHandler from '../../../../../../../../lib/helpers/responseHandler';
import customerModel from './customer.model';

class CustomerController {
    public async getItemsOnFiltering(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Items after applying filter!', await customerModel.getItemsOnApplyingFilter(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetProductDetailsForCustomer(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is your product!', await customerModel.getProductDetailsForCustomer(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetShpopDetailsForCustomer(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is your product!', await customerModel.getShopDetailsForCustomer(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new CustomerController();
