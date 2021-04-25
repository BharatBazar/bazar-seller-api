import productSizeController from './productSize.controller';

export default [
    {
        path: '/productSize/create',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.CreateProductSize],
    },
    {
        path: '/productSize/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [productSizeController.DeleteProductSize],
    },
    {
        path: '/productSize/update',
        method: 'patch',
        escapeAuth: true,
        handler: [productSizeController.UpdateProductSize],
    },
    {
        path: '/productSize/get',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.GetProductSize],
    },
];
