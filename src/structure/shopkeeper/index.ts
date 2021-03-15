import ShopKeeperController from './shopkeeper.controller';

export default [
    {
        path: '/shopkeeper/create',
        method: 'post',
        handler: [ShopKeeperController.create],
    },
];
