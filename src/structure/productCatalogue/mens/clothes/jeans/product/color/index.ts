import jeansColorController from './color.controller';

export default [
    {
        path: 'mens/clothes/jeans/color/create',
        method: 'post',
        escapeAuth: true,
        handler: [jeansColorController.CreateJeansColor],
    },
    {
        path: 'mens/clothes/jeans/color/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [jeansColorController.DeleteJeansColor],
    },
    {
        path: 'mens/clothes/jeans/color/update',
        method: 'patch',
        escapeAuth: true,
        handler: [jeansColorController.UpdateJeansColor],
    },
    {
        path: 'mens/clothes/jeans/color/get',
        method: 'post',
        escapeAuth: true,
        handler: [jeansColorController.GetJeansColor],
    },
];
