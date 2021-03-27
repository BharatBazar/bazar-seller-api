import ShopKeeperController from './shop.controller';

export default [
    {
        path: '/shop/create',
        method: 'post',
        escapeAuth:true,
        handler: [ShopKeeperController.createShop],
    },
      {
        path: '/shop/get',
        method: 'get',
        escapeAuth:true,
        handler: [ShopKeeperController.getShop],
    },
    {
        path: '/shop/update',
        method: 'patch',
        escapeAuth:true,
        handler: [ShopKeeperController.updateShop],
    },
    // {
    //     path: '/shop/getAllShop',
    //     method: 'get',
    //     escapeAuth:true,
    //     handler: [ShopKeeperController]
    // }
];
