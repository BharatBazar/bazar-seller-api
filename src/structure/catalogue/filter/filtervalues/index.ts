import classifierController from './filtervalues.controller';

export default [
    {
        path: '/classifiers/create',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.CreateClassifier],
    },
    {
        path: '/classifiers/update',
        method: 'patch',
        escapeAuth: true,
        handler: [classifierController.UpdateClassifier],
    },
    {
        path: '/classifiers/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.GetAllClassifier],
    },
    {
        path: '/classifiers/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [classifierController.DeleteClassifier],
    },
];
