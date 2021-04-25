import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';
import productColorModel from './productColor.model';

class ProductColorController {
    public async CreateProductColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Product color created.', await productColorModel.createProductColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteProductColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch(
                    'Product color deleted.',
                    await productColorModel.deleteProductColor({ _id: req.query._id, parentId: req.query.parentId }),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateProductColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product color updated.', await productColorModel.updateProductColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetProductColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product color.', await productColorModel.getProductColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductColorController();
