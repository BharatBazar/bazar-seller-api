import { Document } from 'mongoose';

//classifier type is very important as this gives what filter to update in ui
// so name should match the document field
// also this is the medium of connection between filter and its value
export enum classifierTypes {
    SIZE = 'size',
    COLOR = 'color',
    BRAND = 'brand',
    PATTERN = 'pattern',
    FIT = 'fit',
}

export interface IClassfier {
    name: string; // Name should be any thing like value for example for size name will be 28, for color name will be red etc..
    description: string; // Description should be meta data or for example for color colorCode will be description, for size unit like cm or inch will be description
    image: string; // Can be provided for pattern or brand etc..
    type: classifierTypes; //type is the classifier to which the document belongs
    parent: string;
    customerName: string;
    customerDescription: string;
    customerImage: string;
    active: boolean;
}

export interface IClassifierModel extends IClassfier, Document {}
