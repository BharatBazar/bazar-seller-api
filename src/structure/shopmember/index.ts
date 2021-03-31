import ShopController from './shopmember.controller';

export default [
    {
        path: '/shopMember/create',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.CreateShopMember],
    },
    {
        path: '/shopMember/checkPhoneNumber',
        method: 'get',
        escapeAuth: true,
        handler: [ShopController.CheckPhoneNumber],
    },
    {
        path: '/shopMember/login',
        method: 'get',
        escapeAuth: true,
        handler: [ShopController.ShopMemberLogin],
    },
    {
        path: '/shopMember/createPassword',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.CreatePassword],
    },
    {
        path: '/shopMember/createMember',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.CreateMembers],
    },
];
