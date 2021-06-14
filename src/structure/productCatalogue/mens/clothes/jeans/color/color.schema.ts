import { Types } from 'mongoose';

export interface ColorSchema {
    //One more thing productcolor id should be user generated id or a barcode id something like that so that
    //shopkeeper can easily identify product by barcode scan or manually typing and update it need to think about it.
    parentId: Types.ObjectId; // Will refer to aparent product schema
    productColorName: string; //Predefined color name should be there
    productColorCode: string;
    productIncludedColor: [string];
    productSize: [Types.ObjectId];
    productPhotos: [string]; //Minimum 6 photo is required we need to guide dukandar about how to take photo
}
