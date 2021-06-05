import AddressController from './address.controller';

export default [
    {
        path: '/address/create',
        method: 'post',
        escapeAuth: true,
        handler: [AddressController.CreateAddress],
    },
    {
        path: '/address/update',
        method: 'patch',
        escapeAuth: true,
        handler: [AddressController.UpdateAddress],
    },
    {
        path: '/address/checkpincode',
        method: 'post',
        escapeAuth: true,
        handler: [AddressController.checkPincode],
    },

    {
        path: '/address/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [AddressController.GetAddress],
    },

    {
        path: '/address/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [AddressController.DeleteAddress],
    },
];
