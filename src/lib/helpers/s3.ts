import { S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { HTTP400Error } from '../utils/httpErrors';
import { s3Config } from '../../config';

export const s3 = new S3({
    accessKeyId: s3Config.accessKey,
    secretAccessKey: s3Config.secretKey,
    region: s3Config.region,
    signatureVersion: 'v4',
});

export const s3UploadMulter = multer({
    storage: multerS3({
        s3,
        bucket: s3Config.bucketName,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

interface IData {
    folder: string;
    key: s3BucketKeys;
    ContentType: string;
    userId?: string;
}

export enum s3BucketKeys {
    productImage = 'product-image',
}

const getSignedUrl = (Key: s3BucketKeys, ContentType?: string) => {
    return new Promise((resolve, reject) => {
        s3.getSignedUrl(
            'putObject',
            {
                Bucket: s3Config.bucketName,
                //  ContentType: 'image/png',

                Key: Key,
            },
            (err, url) => {
                console.log('error =>', err, url);
                if (err) {
                    reject(err);
                }
                console.log(url);
                resolve(url);
            },
        );
    });
};

// Get sign url::
export const getSignUrl = async (data: Partial<IData>) => {
    try {
        const { key } = data;

        return { Key: '', url: await getSignedUrl(key, '') };
    } catch (e) {
        console.log('error =>', e);
        throw new HTTP400Error('This url has already been used', 'Please create new url then try');
    }
};

export const convertToArray = (key: string | string[]): { Key: string }[] => {
    let data: { Key: string }[] = [];
    if (typeof key == 'string') {
        data.push({ Key: key });
        return data;
    }
    return key.map((item) => {
        return { Key: item };
    });
};

export const deleteImage = async (key: string | string[]) => {
    try {
        const s3 = new S3({
            accessKeyId: s3Config.accessKey,
            secretAccessKey: s3Config.secretKey,
            region: s3Config.region,
            signatureVersion: 'v4',
        });

        const deleteArray = convertToArray(key);

        const deleted = await s3.deleteObjects(
            {
                Delete: {
                    Objects: deleteArray,
                },
                Bucket: s3Config.bucketName,
            },
            function (err, data) {
                if (err) {
                    throw new HTTP400Error(err.message);
                } else {
                    return true;
                }
            },
        );
        if (deleted) {
            return 'Image deleted';
        } else {
            throw new HTTP400Error('Problem deleting image');
        }
    } catch (error) {
        console.log(error);
        throw new HTTP400Error(error.message);
    }
};
