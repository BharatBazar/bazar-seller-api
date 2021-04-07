import productCatalogueController from './productCatalogue.controller';

export default [
    {
        path: '/productCatalogue/addProduct',
        method: 'post',
        escapeAuth: true,
        handler: [productCatalogueController.AddProductInCatalogue],
    },
    {
        path: '/productCatalogue/updateProduct',
        method: 'patch',
        escapeAuth: true,
        handler: [productCatalogueController.UpdateProductInCatalogue],
    },
    {
        path: '/productCatalogue/getProducts',
        method: 'post',
        escapeAuth: true,
        handler: [productCatalogueController.GetProductCatalogue],
    },
];
