import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';
import ProductModel from './product.model';

class ProductController {
    public async CreateProdcut(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Product created!', await ProductModel.createProduct(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateProdcut(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product updated!', await ProductModel.updateProduct(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetProduct(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is your product!', await ProductModel.getProduct(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetAllProduct(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is the product you asked for!', await ProductModel.getAllProduct(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductController();
