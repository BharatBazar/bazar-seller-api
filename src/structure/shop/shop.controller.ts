import ShopKeeperModel from './shop.model';
import { user } from '../../lib/helpers/customMessage';
import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';

class ShopKeeperController {
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate(user.CREATED, await ShopKeeperModel.createShopkeeper(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    };
}

export default new ShopKeeperController();
