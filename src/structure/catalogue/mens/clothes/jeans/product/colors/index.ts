import jeansColorController from './color.controller';

export default [
    {
        path: '/jeans/color/create',
        method: 'post',
        escapeAuth: true,
        handler: [jeansColorController.CreateJeansColor],
    },
    {
        path: '/jeans/color/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [jeansColorController.DeleteJeansColor],
    },
    {
        path: '/jeans/color/update',
        method: 'patch',
        escapeAuth: true,
        handler: [jeansColorController.UpdateJeansColor],
    },
    {
        path: '/jeans/color/get',
        method: 'post',
        escapeAuth: true,
        handler: [jeansColorController.GetJeansColor],
    },
];
