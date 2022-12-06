import { NextFunction } from 'express';
import ResponseHandler from '../../../../lib/helpers/responseHandler';
import filterCustomerModel from './filter.customer.model';

class FilterCustomerController {
    public async GetFiltersAndValueForAShop(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is all the filters!', await filterCustomerModel.getFilterWithValue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new FilterCustomerController();
