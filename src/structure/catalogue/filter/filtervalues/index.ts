import filterValuesController from './filtervalues.controller';

export default [
    {
        path: '/filtervalues/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterValuesController.CreateFilterValues],
    },
    {
        path: '/filtervalues/update',
        method: 'patch',
        escapeAuth: true,
        handler: [filterValuesController.UpdateFilterValues],
    },
    {
        path: '/filtervalues/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [filterValuesController.GetAllFilterValues],
    },
    {
        path: '/filtervalues/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [filterValuesController.DeleteFilterValues],
    },
    {
        path: '/filtervalues/activate',
        method: 'patch',
        escapeAuth: true,
        handler: [filterValuesController.ActivateFilter],
    },
];
