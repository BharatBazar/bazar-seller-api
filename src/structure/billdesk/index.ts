import billdeskController from './billdesk.controller';

export default [
    {
        path: '/bill/create',
        method: 'post',
        escapeAuth: true,
        handler: [billdeskController.CreateBill],
    },
    {
        path: '/bill/show/:id',
        method: 'get',
        escapeAuth: true,
        handler: [billdeskController.ShowBill],
    },
    {
        path: '/bill/update/:id',
        method: 'patch',
        escapeAuth: true,
        handler: [billdeskController.updateBill],
    },
];
