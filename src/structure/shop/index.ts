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
        path: '/shop/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [ShopController.deleteShop],
    },
    {
        path: '/shop/verificationDetails',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.getShopVerificationDetails],
    },
    {
        path: '/shop/update',
        method: 'patch',
        escapeAuth: true,
        handler: [ShopController.updateShop],
    },
    {
        path: '/shop/getAllShop',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.getAllShop],
    },
    {
        path: '/shop/searchShop',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.searchShopByName],
    },
    {
        path: '/shop/getCatalogue',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.getShopCatalogueDetails],
    },
    {
        path: '/shop/updateCatalogue',
        method: 'patch',
        escapeAuth: true,
        handler: [ShopController.updateShopCatalogueDetails],
    },
    {
        path: '/shop/saveFilterValues',
        method: 'patch',
        escapeAuth: true,
        handler: [ShopController.updateShopWithFilterValues],
    },
    {
        path: '/shop/getFilterValues',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.getFilterWithValuesAndSelectedFilterForShop],
    },
];
