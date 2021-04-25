import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';
import productSizeModel from './productSize.model';

class ProductSizeController {
    public async CreateProductSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Product size created.', await productSizeModel.createProductSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteProductSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch(
                    'Product size deleted.',
                    await productSizeModel.deleteProductSize({ _id: req.query._id, parentId: req.query.parentId }),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateProductSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product size updated.', await productSizeModel.updateProductSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetProductSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product size.', await productSizeModel.getProductSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductSizeController();
