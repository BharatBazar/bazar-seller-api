import filterController from './filter.controller';

export default [
    {
        path: '/mens/clothes/jeans/filter/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.CreateFilter],
    },
    {
        path: '/mens/clothes/jeans/filter/getAll',
        method: 'get',
        escapeAuth: true,
        handler: [filterController.GetAllFilter],
    },
    {
        path: '/mens/clothes/jeans/filter/getAllWithValue',
        method: 'get',
        escapeAuth: true,
        handler: [filterController.GetAllFilterWithValue],
    },
    {
        path: '/mens/clothes/jeans/filter/update',
        method: 'patch',
        escapeAuth: true,
        handler: [filterController.UpdateFilter],
    },
];
