import filterController from './filter.controller';

export default [
    {
        path: '/mens/clothes/jeans/filter/create',
        method: 'post',
        escapeAuth: true,
        handler: [filterController.CreateProdcut],
    },
];
