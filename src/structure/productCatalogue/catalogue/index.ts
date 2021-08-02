import productCatalogueController from './productCatalogue.controller';

export default [
    {
        path: '/catalogue/add',
        method: 'post',
        escapeAuth: true,
        handler: [productCatalogueController.AddProductInCatalogue],
    },
    {
        path: '/catalogue/update',
        method: 'patch',
        escapeAuth: true,
        handler: [productCatalogueController.UpdateProductInCatalogue],
    },
    {
        path: '/catalogue/get',
        method: 'post',
        escapeAuth: true,
        handler: [productCatalogueController.GetProductCatalogue],
    },
    {
        path: '/catalogue/delete',
        method: 'delete',
        escapeAuth: true,
        handler: [productCatalogueController.DeleteProductInCatalogue],
    },
    {
        path: '/catalogue/activateItem',
        method: 'patch',
        escapeAuth: true,
        handler: [productCatalogueController.activateCatalogueItem],
    },
];
