import productColorController from './product_color.controller';

export default [
    {
        path: '/product/color/create',
        method: 'post',
        escapeAuth: true,
        handler: [productColorController.CreateProductColor],
    },
    {
        path: '/product/color/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [productColorController.DeleteProductColor],
    },
    {
        path: '/product/color/update',
        method: 'patch',
        escapeAuth: true,
        handler: [productColorController.UpdateProductColor],
    },
    {
        path: '/product/color/get',
        method: 'post',
        escapeAuth: true,
        handler: [productColorController.GetProductColor],
    },
];
