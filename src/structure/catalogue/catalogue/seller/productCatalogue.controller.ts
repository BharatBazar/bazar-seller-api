import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../../../lib/helpers/responseHandler';
import productCatalogueModel from './productCatalogue.model';

class ProductCatalogueController {
    public async AddProductInCatalogue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Creating new product catalogue', await productCatalogueModel.AddProductCatalogue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
    public async UpdateProductInCatalogue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Product catalogue updated', await productCatalogueModel.UpdateProductCatalogue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
    public async DeleteProductInCatalogue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch(
                    'Product catalogue deleted',
                    await productCatalogueModel.DeleteProductCatalogue({ _id: req.query._id }),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
    public async GetProductCatalogue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('All the products', await productCatalogueModel.GetProductCatalogue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
    public async GetProductCatalogueWithAncestors(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('All the products', await productCatalogueModel.GetProductCatalogueWithAncestors(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async activateCatalogueItem(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Catalogue item activated', await productCatalogueModel.ActivateCatalogue(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ProductCatalogueController();
