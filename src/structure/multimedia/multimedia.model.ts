import { deleteImage, getSignUrl, s3BucketKeys } from './../../lib/helpers/s3';

class MultimediaModel {
    public getSignedUrl = async (data: s3BucketKeys) => {
        return await getSignUrl({ key: data });
    };

    public deletePhotoWithKey = async (data: { key: string }) => {
        return await deleteImage(data.key);
    };
}

export default new MultimediaModel();
