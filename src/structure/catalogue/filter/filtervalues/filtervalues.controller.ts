import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../../../lib/helpers/responseHandler';
import FilterValuesModel from './filtervalues.model';

class FilterValuesController {
    public async CreateFilterValues(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('FilterValues created!', await FilterValuesModel.createFilterValues(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateFilterValues(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('FilterValues updated!', await FilterValuesModel.updateFilterValues(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteFilterValues(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Filter item deleted!', await FilterValuesModel.deleteFilterValues({ _id: req.query._id }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    // public async GetFilterValues(req: Request, res: Response, next: NextFunction) {
    //     const responseHandler = new ResponseHandler();
    //     try {
    //         responseHandler
    //             .reqRes(req, res)
    //             .onFetch('Here is your product!', await FilterValuesModel.getFilterValues(req.body))
    //             .send();
    //     } catch (error) {
    //         next(responseHandler.sendError(error));
    //     }
    // }

    public async GetAllFilterValues(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is the filterValues!', await FilterValuesModel.getFilterValues(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async ActivateFilter(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Filter activated!', await FilterValuesModel.activateFilter(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new FilterValuesController();
