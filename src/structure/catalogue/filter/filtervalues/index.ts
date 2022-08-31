import classifierController from './filtervalues.controller';

export default [
    {
        path: '/filtervalues/create',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.CreateClassifier],
    },
    {
        path: '/filtervalues/update',
        method: 'patch',
        escapeAuth: true,
        handler: [classifierController.UpdateClassifier],
    },
    {
        path: '/filtervalues/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [classifierController.GetAllClassifier],
    },
    {
        path: '/filtervalues/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [classifierController.DeleteClassifier],
    },
    {
        path: '/filtervalues/activate',
        method: 'patch',
        escapeAuth: true,
        handler: [classifierController.ActivateFilter],
    },
];
