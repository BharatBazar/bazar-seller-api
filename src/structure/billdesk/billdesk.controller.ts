import { NextFunction, Request, Response } from 'express';

import ResponseHandler from '../../lib/helpers/responseHandler';
import billdeskModel from './billdesk.model';

class BillController {
    public async CreateBill(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Bill created!', await billdeskModel.createBill(req.body))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }

    public async ShowBill(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Bill found!', await billdeskModel.showBill(req))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }
    public async updateBill(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Bill updated!', await billdeskModel.updateBill(req, req.body))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }

    public async deleteBillProduct(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Bill updated!', await billdeskModel.deleteBillProduct(req, req.body))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }

    public async deleteBill(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Bill Deleted!', await billdeskModel.deleteBill(req))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }

    public async checkBillProductExistOrNot(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Bill Fetched!', await billdeskModel.checkBillProductExistOrNot(req.body))
                .send();
        } catch (error: any) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new BillController();
