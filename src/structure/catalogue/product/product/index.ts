import customerController from './customer/customer.controller';
import ProductController from './product.controller';

export default [
    {
        path: '/product/create',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.CreateProduct],
    },
    {
        path: '/product/get',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetProduct],
    },
    {
        path: '/product/update',
        method: 'patch',
        escapeAuth: true,
        handler: [ProductController.UpdateProduct],
    },
    {
        path: '/product/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [ProductController.DeleteProduct],
    },
    {
        path: '/product/delete/filter',
        method: 'patch',
        escapeAuth: true,
        handler: [ProductController.DeleteProductFilter],
    },
    {
        path: '/product/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetAllProduct],
    },
    {
        path: '/product/get/productMeta',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetProductMeta],
    },
    {
        path: '/product/status',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetStatus],
    },

    // customer apis

    {
        path: '/customer/filter/items',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.getItemsOnFiltering],
    },
    {
        path: '/customer/get',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.GetProductDetailsForCustomer],
    },
    {
        path: '/customer/shop/get',
        method: 'post',
        escapeAuth: true,
        handler: [customerController.GetShpopDetailsForCustomer],
    },
];
