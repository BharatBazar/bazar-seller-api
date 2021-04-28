import { Types, Document } from 'mongoose';

export enum categoryType {
    Category = 'Category',
    SubCategory = 'SubCategory',
    SubCategory1 = 'SubCategory1',
}
export interface IProductCatalogue {
    _id: string;
    name: string;
    description: string;
    image: string;
    categoryType: categoryType;
    subCategoryExist: boolean;
    ParentRef: Types.ObjectId;
}

export interface IProductCatalogueModel extends IProductCatalogue, Document {}
