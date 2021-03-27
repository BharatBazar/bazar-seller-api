
import ShopModel from './shop.model';
import { user } from '../../lib/helpers/customMessage';
import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../lib/helpers/responseHandler';

class ShopKeeperController {
    public createShop = async (req: Request, res: Response, next: NextFunction) => {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate(user.CREATED, await ShopModel.createShop(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    };
    
    public getShop = async (req: Request, res: Response, next: NextFunction) => {
        const responsHandler = new ResponseHandler();

        try {
            responsHandler.reqRes(req,res).onFetch(user.FETCH_ALL, await ShopModel.getShop(req.body)).send();
        } catch(error) {
            next(responsHandler.sendError(error))
        }
    }

    public updateShop = async (req:Request, res:Response, next:NextFunction) => {
         const responsHandler = new ResponseHandler();

        try {
            responsHandler.reqRes(req,res).onFetch(user.UPDATED, await ShopModel.updateShop(req.body)) .send();
        } catch(error) {
            next(responsHandler.sendError(error))
        }
    }
}

export default new ShopKeeperController();
