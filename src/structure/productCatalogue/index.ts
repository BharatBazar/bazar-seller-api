import productCatalogueController from './productCatalogue.controller';

export default [
    {
        path: '/productCatalogue/create',
        method: 'post',
        escapeAuth: true,
        handler: [productCatalogueController.AddProductCatagory],
    },
];
