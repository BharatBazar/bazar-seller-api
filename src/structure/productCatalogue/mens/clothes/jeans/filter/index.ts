import JeansFilterController from './filter.controller';

export default [
    {
        path: '/Mens/Clothes/Jeans/get/filter',
        method: 'get',
        escapeAuth: true,
        handler: [JeansFilterController.getJeansFilters],
    },
];
