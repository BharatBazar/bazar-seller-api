import filterController from './filter.controller';

export default [
    {
        path: '/mens/clothes/jeans/filter/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.CreateProdcut],
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
];
