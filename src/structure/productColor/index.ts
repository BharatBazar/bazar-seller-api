import productColorController from './productColor.controller';

export default [
    {
        path: '/productColor/create',
        method: 'post',
        escapeAuth: true,
        handler: [productColorController.CreateProductColor],
    },
    {
        path: '/productColor/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [productColorController.DeleteProductColor],
    },
    {
        path: '/productColor/update',
        method: 'patch',
        escapeAuth: true,
        handler: [productColorController.UpdateProductColor],
    },
    {
        path: '/productColor/get',
        method: 'post',
        escapeAuth: true,
        handler: [productColorController.GetProductColor],
    },
];
