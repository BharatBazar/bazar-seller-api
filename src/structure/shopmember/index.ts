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
        path: '/shopMember/forgetPassword',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.ForgetPassword],
    },
    {
        path: '/shopMember/updatePassword',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.UpdatePassword],
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
    {
        path: '/shopMember/add',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.AddShopMember],
    },
    {
        path: '/shopMember/verify',
        method: 'post',
        escapeAuth: true,
        handler: [ShopController.VerifyShopMember],
    },
];
