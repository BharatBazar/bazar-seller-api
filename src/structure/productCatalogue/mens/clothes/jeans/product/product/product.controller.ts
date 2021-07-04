import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../../../../../../lib/helpers/responseHandler';
import JeansModel from './product.model';

class JeansController {
    public async CreateJeans(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Jeans created!', await JeansModel.createJeans(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateJeans(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans updated!', await JeansModel.updateJeans(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteJeans(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans deleted!', await JeansModel.deleteJeans({ _id: req.query._id }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteJeansFilter(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans filters deleted!', await JeansModel.deleteJeansFilter({ ...req.body }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetJeans(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is your product!', await JeansModel.getJeans(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetAllJeans(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is the product you asked for!', await JeansModel.getAllJeans(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new JeansController();
