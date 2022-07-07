import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../../../../../../lib/helpers/responseHandler';
import ClassifierModel from './classifier.model';

class ClassifierController {
    public async CreateClassifier(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onCreate('Classifier created!', await ClassifierModel.createClassifier(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async UpdateClassifier(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Classifier updated!', await ClassifierModel.updateClassifier(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    public async DeleteClassifier(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Filter item deleted!', await ClassifierModel.deleteClassifier({ _id: req.query._id }))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    // public async GetClassifier(req: Request, res: Response, next: NextFunction) {
    //     const responseHandler = new ResponseHandler();
    //     try {
    //         responseHandler
    //             .reqRes(req, res)
    //             .onFetch('Here is your product!', await ClassifierModel.getClassifier(req.body))
    //             .send();
    //     } catch (error) {
    //         next(responseHandler.sendError(error));
    //     }
    // }

    public async GetAllClassifier(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Here is the classifier!', await ClassifierModel.getClassifier(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new ClassifierController();
