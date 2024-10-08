import customerController from './customer/customer.controller';
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
    {
        path: '/jeans/status',
        method: 'post',
        escapeAuth: true,
        handler: [JeansController.GetStatus],
    },

    // customer apis

    {
        path: '/jeans/customer/filter/items',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.getItemsOnFiltering],
    },
    {
        path: '/jeans/customer/get',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.GetProductDetailsForCustomer],
    },
    {
        path: '/jeans/customer/shop/get',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.GetShpopDetailsForCustomer],
    },
];
