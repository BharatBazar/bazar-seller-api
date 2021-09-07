import productIdController from './productId.controller';

export default [
    {
        path: '/productId/generate',
        method: 'post',
        escapeAuth: true,
        handler: [productIdController.generateProductId],
    },
];
