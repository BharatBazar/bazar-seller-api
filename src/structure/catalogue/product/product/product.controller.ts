import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../../../lib/helpers/responseHandler';
import ProductModel from './product.model';

class ProductController {
    public async CreateProduct(req: Request, res: Response, next: NextFunction) {
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

    public async UpdateProduct(req: Request, res: Response, next: NextFunction) {
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

    public async DeleteProduct(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product deleted!', await ProductModel.deleteProduct({ _id: req.query._id }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteProductFilter(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product filters deleted!', await ProductModel.deleteProductFilter({ ...req.body }))
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

    public async GetProductMeta(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('here is your product!', await ProductModel.getProductMeta(req.body))
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

    public async GetStatus(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is the product you asked for!', await ProductModel.provideStatus(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductController();
