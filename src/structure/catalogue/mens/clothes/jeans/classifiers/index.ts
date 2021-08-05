import classifierController from './classifier.controller';

export default [
    {
        path: '/jeans/classifiers/create',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.CreateClassifier],
    },
    {
        path: '/jeans/classifiers/update',
        method: 'patch',
        escapeAuth: true,
        handler: [classifierController.UpdateClassifier],
    },
    {
        path: '/jeans/classifiers/getAll',
        method: 'get',
        escapeAuth: true,
        handler: [classifierController.GetAllClassifier],
    },
];
