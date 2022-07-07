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
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.GetAllClassifier],
    },
    {
        path: '/jeans/classifiers/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [classifierController.DeleteClassifier],
    },
];
