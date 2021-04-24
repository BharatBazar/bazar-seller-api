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
        handler: [productSizeController.DeleteProductSize,
    },
];
