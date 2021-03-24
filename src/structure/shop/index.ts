import ShopKeeperController from './shop.controller';

export default [
    {
        path: '/shopkeeper/create',
        method: 'post',
        handler: [ShopKeeperController.create],
    },
];
