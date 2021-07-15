import ShopMemberModel from './shopmember.model';
import ResponseHandler from '../../lib/helpers/responseHandler';
import { NextFunction, Request, Response } from 'express';

class ShopMemberController {
    async ShopMemberLogin(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Login successfull!!', await ShopMemberModel.ShopMemberLogin(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async ForgetPassword(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Request successfull!', await ShopMemberModel.forgetPassword(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async UpdatePassword(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();

        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Password updated!', await ShopMemberModel.updatePassword(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async CreateShopMember(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate(
                    'Hurray! Step one of creating your duka completed.',
                    await ShopMemberModel.createShopMember(req.body),
                )
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async DeleteMember(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Shop member deleted.', await ShopMemberModel.deleteMember(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
    async CheckPhoneNumber(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('OTP sent to provided mobile number', await ShopMemberModel.checkPhoneNumber(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async CreatePassword(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Password created', await ShopMemberModel.createPassword(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ShopMemberController();
