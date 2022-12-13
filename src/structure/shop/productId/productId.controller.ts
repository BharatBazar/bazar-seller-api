import ResponseHandler from '../../../lib/helpers/responseHandler';
import { NextFunction, Request, Response } from 'express';
import productIdModel from './productId.model';

class ProductIdController {
    public generateProductId = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product id generated.', await productIdModel.generateProductId(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    };
}

export default new ProductIdController();
