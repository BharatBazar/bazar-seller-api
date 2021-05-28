import ShopController from './shop.controller';

export default [
    {
        path: '/shop/create',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.createShop],
    },
    {
        path: '/shop/get',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.getShop],
    },
    {
        path: '/shop/update',
        method: 'patch',
        escapeAuth: true,
        handler: [ShopController.updateShop],
    },
    {
        path: '/shop/getAllShop',
        method: 'get',
        escapeAuth: true,
        handler: [ShopController.getAllShop],
    },
    {
        path: '/shop/searchShop',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.searchShopByName],
    },
];
