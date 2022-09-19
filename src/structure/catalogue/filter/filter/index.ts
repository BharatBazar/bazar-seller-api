import filterController from './filter.controller';

export default [
    {
        path: '/filter/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.CreateFilter],
    },
    {
        path: '/filter/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.GetAllFilter],
    },
    {
        path: '/filter/getAllWithValue',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.GetAllFilterWithValue],
    },
    {
        path: '/filter/update',
        method: 'patch',
        escapeAuth: true,
        handler: [filterController.UpdateFilter],
    },
    {
        path: '/filter/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [filterController.DeleteFilter],
    },
    {
        path: '/filter/activate',
        method: 'patch',
        escapeAuth: true,
        handler: [filterController.ActivateFilter],
    },
    {
        path: '/filter/filterValues',
        method: 'get',
        escapeAuth: true,
        handler: [filterController.GetAllFilterValues],
    },
];
