import ProductController from './product.controller';

export default [
    {
        path: '/product/create',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.CreateProdcut],
    },
    {
        path: '/product/get',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetProduct],
    },
    {
        path: '/shop/update',
        method: 'patch',
        escapeAuth: true,
        handler: [ProductController.UpdateProdcut],
    },
    {
        path: '/shop/getAllShop',
        method: 'get',
        escapeAuth: true,
        handler: [ProductController.GetAllProduct],
    },
];
