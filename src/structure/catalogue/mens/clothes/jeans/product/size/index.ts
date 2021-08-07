import jeansSizeController from './size.controller';

export default [
    {
        path: '/jeans/size/create',
        method: 'post',
        escapeAuth: true,
        handler: [jeansSizeController.CreateJeansSize],
    },
    {
        path: '/jeans/size/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [jeansSizeController.DeleteJeansSize],
    },
    {
        path: '/jeans/size/update',
        method: 'patch',
        escapeAuth: true,
        handler: [jeansSizeController.UpdateJeansSize],
    },
    {
        path: '/jeans/size/get',
        method: 'post',
        escapeAuth: true,
        handler: [jeansSizeController.GetJeansSize],
    },
];
