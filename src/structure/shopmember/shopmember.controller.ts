import ShopMemberModel from './shopmember.model';
import ResponseHandler from "../../lib/helpers/responseHandler";
import { NextFunction, Request, Response } from 'express';


class ShopMemberController {
    async ShopMemberLogin(req: Request, res: Response, next: NextFunction) {
        const responsHandler = new ResponseHandler();

        try {
            responsHandler.reqRes(req,res).onFetch("Login successfull!!",await ShopMemberModel.ShopMemberLogin(req.body) ).send();
        } catch(error) {
            next(responsHandler.sendError(error))
        }
    }
}


export default new ShopMemberController();