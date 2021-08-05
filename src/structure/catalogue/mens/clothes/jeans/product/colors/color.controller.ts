import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../../../../../../lib/helpers/responseHandler';
import jeansColorModel from './color.model';

class JeansColorController {
    public async CreateJeansColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Jeans color created.', await jeansColorModel.createJeansColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteJeansColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch(
                    'Jeans color deleted.',
                    await jeansColorModel.deleteJeansColor({ _id: req.query._id, parentId: req.query.parentId }),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateJeansColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans color updated.', await jeansColorModel.updateJeansColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetJeansColor(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans color.', await jeansColorModel.getJeansColor(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new JeansColorController();
