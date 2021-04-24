import productSizeController from './productSize.controller';

export default [
    {
        path: '/productSize/create',
        method: 'post',
        escapeAuth: true,
        handler: [productSizeController.CreateProductSize],
    },
];
