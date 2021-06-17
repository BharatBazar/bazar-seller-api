import JeansFilterModel from './filter.model';

import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../../../../../lib/helpers/responseHandler';

class JeansFilterController {
    public async getJeansFilters(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Product created!', await JeansFilterModel.getJeansFilter())
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new JeansFilterController();
