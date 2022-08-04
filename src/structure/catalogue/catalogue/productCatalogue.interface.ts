import { Types, Document } from 'mongoose';

export enum categoryType {
    Category = 'Category',
    SubCategory = 'SubCategory',
    SubCategory1 = 'SubCategory1',
}
export interface IProductCatalogue {
    name: string;
    _id: Types.ObjectId;
    description: string;
    image: string;
    customer_name: string;
    customer_description: string;
    customer_image: string;
    subCategoryExist: boolean;
    parent: Types.ObjectId;
    child: Types.ObjectId[];
    path: Types.ObjectId[];
    active: boolean;
    type: string;
    totalFilterAdded: number;
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
