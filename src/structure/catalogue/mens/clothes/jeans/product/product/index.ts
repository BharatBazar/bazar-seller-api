import JeansController from './product.controller';

export default [
    {
        path: '/jeans/create',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.CreateJeans],
    },
    {
        path: '/jeans/get',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetJeans],
    },
    {
        path: '/jeans/update',
        method: 'patch',
        escapeAuth: true,
        handler: [JeansController.UpdateJeans],
    },
    {
        path: '/jeans/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [JeansController.DeleteJeans],
    },
    {
        path: '/jeans/delete/filter',
        method: 'patch',
        escapeAuth: true,
        handler: [JeansController.DeleteJeansFilter],
    },
    {
        path: '/jeans/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetAllJeans],
    },
    {
        path: '/jeans/get/productMeta',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetJeansMeta],
    },
];
