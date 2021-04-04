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
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.CheckPhoneNumber],
    },
    {
        path: '/shopMember/login',
        method: 'post',
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
        path: '/shopMember/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [ShopController.DeleteMember],
    },
];
