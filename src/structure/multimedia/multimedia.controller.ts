import ResponseHandler from '../../lib/helpers/responseHandler';
import MultimediaModel from './multimedia.model';

class MultimediaController {
    async GetPhotoUrl(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('updated dashboard status', await MultimediaModel.getSignedUrl(req.body.key))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }

    async deleteImage(req: Request, res: Response, next: NextFunction) {
        const responseHandler = new ResponseHandler();
        try {
            responseHandler
                .reqRes(req, res)
                .onFetch('Image deleted', await MultimediaModel.deletePhotoWithKey(req.body))
                .send();
        } catch (error) {
            next(responseHandler.sendError(error));
        }
    }
}

export default new MultimediaController();
