import { Model, Types, Document } from 'mongoose';

export interface ShopCatalogue {
    //Why i am not breaking the table into two is that the data in this table will be limited so repetation of category and subCategory
    //should not cause much storage issue
    //also i have one case in mymind that if we shard then the category, subCategory and subCategory1 will be mostly same for every location so
    //in total it will save storage. I will think about it in future. No worries right now
    category: string;
    subCategory: string;
    subCategory1: string;
    shopIds: [string];
}

export interface IShopCatalogueModelG extends Document, ShopCatalogue {}

export interface ICategory {
    category: string;
    subCategory: string;
    subCategory1: string;
}

export interface IShopCatalogueModel extends Model<IShopCatalogueModelG> {
    categoryExistOrNot: (data: ICategory) => Promise<boolean>;
}
