import productSizeController from './product_size.controller';

export default [
    {
        path: '/product/size/create',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.CreateProductSize],
    },
    {
        path: '/product/size/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [productSizeController.DeleteProductSize],
    },
    {
        path: '/product/size/update',
        method: 'patch',
        escapeAuth: true,
        handler: [productSizeController.UpdateProductSize],
    },
    {
        path: '/product/size/get',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.GetProductSize],
    },
    {
        path: '/product/size/getItem',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.GetItem],
    },
];
