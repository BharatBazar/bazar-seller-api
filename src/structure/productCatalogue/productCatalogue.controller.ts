import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';
import productCatalogueModel from './productCatalogue.model';

class ProductCatalogueController {
    public async AddProductCatagory(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Creating new product catalogue', await productCatalogueModel.AddProductCategory(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductCatalogueController();
