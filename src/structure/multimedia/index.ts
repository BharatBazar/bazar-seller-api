import multimediaController from './multimedia.controller';

export default [
    {
        path: '/multimedia/getPhotoUrl',
        method: 'post',
        escapeAuth: true,
        handler: [multimediaController.GetPhotoUrl],
    },
    {
        path: '/multimedia/deleteImage',
        method: 'post',
        escapeAuth: true,
        handler: [multimediaController.deleteImage],
    },
];
