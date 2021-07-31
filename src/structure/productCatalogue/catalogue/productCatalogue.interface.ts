import { Types, Document } from 'mongoose';

export enum categoryType {
    Category = 'Category',
    SubCategory = 'SubCategory',
    SubCategory1 = 'SubCategory1',
}
export interface IProductCatalogue {
    name: string;
    description: string;
    image: string;
    categoryType: categoryType;
    subCategoryExist: boolean;
    parentRef: Types.ObjectId;
    childRef: Types.ObjectId[];
    activate: boolean;
    filters: [
        {
            name: 'Size';
            description: 'This filter contain size related details';
            value: ['28', '29', '30'];
            unit: 'cm';
            type: 'multiselect';
        },
        {
            name: 'Brands';
            value: ['Adidas', 'Nike'];
            type: 'SearchDropDown';
        },
        {
            name: 'Categories';
            value: ['Damaged', 'All'];
            type: 'Multiselectdropdown';
        },
        {
            name: 'Colors';
            value: [{ name: 'green'; colorCode: '#234342' }, { name: 'red'; colorCode: 'something' }];
            type: 'Multiselecttags';
        },
        {},
    ];
}

export interface IProductCatalogueModel extends IProductCatalogue, Document {}
