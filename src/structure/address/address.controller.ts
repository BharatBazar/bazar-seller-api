import AddressModel from './address.model';
import ResponseHandler from '../../lib/helpers/responseHandler';
import { NextFunction, Request, Response } from 'express';

class AddressConroller {
    async CreateAddress(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Address created.', await AddressModel.createAddress(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async checkPincode(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Pincode available.', await AddressModel.checkPincode(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async UpdateAddress(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Address updated.', await AddressModel.updateAddress(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async DeleteAddress(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        console.log(req.body);
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Address deleted.', await AddressModel.deleteAddress({ _id: req.query }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async GetAddress(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('All member list', await AddressModel.getAddress(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new AddressConroller();
