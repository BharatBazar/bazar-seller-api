import { Types, Document } from 'mongoose';

export interface IProductCatalogue {
    _id: string;
    category: [
        {
            subCategory1: string;
            subCategory2: [string];
        },
    ];
}

export interface IProductCatalogueModel extends IProductCatalogue, Document {}
