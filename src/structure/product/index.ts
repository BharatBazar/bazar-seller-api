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
        path: '/product/update',
        method: 'patch',
        escapeAuth: true,
        handler: [ProductController.UpdateProdcut],
    },
    {
        path: '/product/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [ProductController.DeleteProdcut],
    },
    {
        path: '/product/getAllProduct',
        method: 'post',
        escapeAuth: true,
        handler: [ProductController.GetAllProduct],
    },
];
