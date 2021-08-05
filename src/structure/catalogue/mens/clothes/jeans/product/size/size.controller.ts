import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../../../../../../lib/helpers/responseHandler';
import jeansSizeModel from './size.model';

class JeansSizeController {
    public async CreateJeansSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Jeans size created.', await jeansSizeModel.createJeansSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteJeansSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch(
                    'Jeans size deleted.',
                    await jeansSizeModel.deleteJeansSize({ _id: req.query._id, parentId: req.query.parentId }),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateJeansSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans size updated.', await jeansSizeModel.updateJeansSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetJeansSize(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Jeans size.', await jeansSizeModel.getJeansSize(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new JeansSizeController();
