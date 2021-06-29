import JeansController from './product.controller';

export default [
    {
        path: 'mens/clothes/jeans/create',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.CreateJeans],
    },
    {
        path: 'mens/clothes/jeans/get',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetJeans],
    },
    {
        path: 'mens/clothes/jeans/update',
        method: 'patch',
        escapeAuth: true,
        handler: [JeansController.UpdateJeans],
    },
    {
        path: 'mens/clothes/jeans/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [JeansController.DeleteJeans],
    },
    {
        path: 'mens/clothes/jeans/getAllJeans',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetAllJeans],
    },
];
