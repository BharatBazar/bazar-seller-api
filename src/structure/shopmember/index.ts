import ShopController from './shopmember.controller';

export default [
    {
        path: '/shopMember/login',
        method: 'get',
        escapeAuth: true,
        handler: [ShopController.ShopMemberLogin],
    },
];
