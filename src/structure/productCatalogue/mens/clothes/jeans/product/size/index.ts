import jeansSizeController from './size.controller';

export default [
    {
        path: '/mens/clothes/jeans/size/create',
        method: 'post',
        escapeAuth: true,
        handler: [jeansSizeController.CreateJeansSize],
    },
    {
        path: '/mens/clothes/jeans/size/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [jeansSizeController.DeleteJeansSize],
    },
    {
        path: '/mens/clothes/jeans/size/update',
        method: 'patch',
        escapeAuth: true,
        handler: [jeansSizeController.UpdateJeansSize],
    },
    {
        path: '/mens/clothes/jeans/size/get',
        method: 'post',
        escapeAuth: true,
        handler: [jeansSizeController.GetJeansSize],
    },
];
