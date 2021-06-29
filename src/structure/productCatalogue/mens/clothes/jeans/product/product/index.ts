import JeansController from './product.controller';

export default [
    {
        path: '/product/create',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.CreateJeans],
    },
    {
        path: '/product/get',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetJeans],
    },
    {
        path: '/product/update',
        method: 'patch',
        escapeAuth: true,
        handler: [JeansController.UpdateJeans],
    },
    {
        path: '/product/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [JeansController.DeleteJeans],
    },
    {
        path: '/product/getAllJeans',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetAllJeans],
    },
];
