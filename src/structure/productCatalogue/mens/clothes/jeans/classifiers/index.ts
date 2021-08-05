import classifierController from './classifier.controller';

export default [
    {
        path: '/mens/clothes/jeans/classifiers/create',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.CreateClassifier],
    },
    {
        path: '/mens/clothes/jeans/classifiers/update',
        method: 'patch',
        escapeAuth: true,
        handler: [classifierController.UpdateClassifier],
    },
    {
        path: '/mens/clothes/jeans/classifiers/getAll',
        method: 'get',
        escapeAuth: true,
        handler: [classifierController.GetAllClassifier],
    },
];
