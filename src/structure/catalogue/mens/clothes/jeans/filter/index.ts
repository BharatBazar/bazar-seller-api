import filterController from './filter.controller';

export default [
    {
        path: '/jeans/filter/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.CreateFilter],
    },
    {
        path: '/jeans/filter/getAll',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.GetAllFilter],
    },
    {
        path: '/jeans/filter/getAllWithValue',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.GetAllFilterWithValue],
    },
    {
        path: '/jeans/filter/update',
        method: 'patch',
        escapeAuth: true,
        handler: [filterController.UpdateFilter],
    },
    {
        path: '/jeans/filter/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [filterController.DeleteFilter],
    },
    {
        path: '/jeans/filter/classifier',
        method: 'get',
        escapeAuth: true,
        handler: [filterController.GetAllClassifier],
    },
];
