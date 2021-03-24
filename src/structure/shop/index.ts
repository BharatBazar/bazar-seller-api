import ShopKeeperController from './shop.controller';

export default [
    {
        path: '/shop/create',
        method: 'post',
        escapeAuth:true,
        handler: [ShopKeeperController.create],
    },
      {
        path: '/shop/get',
        method: 'get',
        escapeAuth:true,
        handler: [ShopKeeperController.getShop],
    },
];
