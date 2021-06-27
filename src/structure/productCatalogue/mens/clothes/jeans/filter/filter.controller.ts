import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../../../../../lib/helpers/responseHandler';
import FilterModel from './filter.model';

class FilterController {
    public async CreateProdcut(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Filter created!', await FilterModel.createFilter(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    // public async UpdateProdcut(req: Request, res: Response, next: NextFunction) {
    //     const responseHandler = new ResponseHandler();
    //     try {
    //         responseHandler
    //             .reqRes(req, res)
    //             .onFetch('Filter updated!', await FilterModel.updateFilter(req.body))
    //             .send();
    //     } catch (error) {
    //         next(responseHandler.sendError(error));
    //     }
    // }

    // public async DeleteProdcut(req: Request, res: Response, next: NextFunction) {
    //     const responseHandler = new ResponseHandler();
    //     try {
    //         responseHandler
    //             .reqRes(req, res)
    //             .onFetch('Filter deleted!', await FilterModel.deleteFilter({ _id: req.query._id }))
    //             .send();
    //     } catch (error) {
    //         next(responseHandler.sendError(error));
    //     }
    // }

    public async GetAllFilterWithValue(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is all the filters!', await FilterModel.getAllFilterWithValue())
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async GetAllFilter(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Filters..!', await FilterModel.getFilter())
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new FilterController();
