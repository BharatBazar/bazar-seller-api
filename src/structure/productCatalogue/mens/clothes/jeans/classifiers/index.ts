import classifierController from './classifier.controller';

export default [
    {
        path: '/mens/clothes/jeans/classifiers/create',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.CreateClassifier],
    },
];
