import { Types, Document } from 'mongoose';

export interface ProductColor {
    //One more thing productcolor id should be user generated id or a barcode id something like that so that
    //shopkeeper can easily identify product by barcode scan or manually typing and update it need to think about it.
    productParent: Types.ObjectId; // Will refer to above product schema
    productColor: string; //Predefined color name should be there
    productSize: [number]; // Quantity, Mrp and Sp will match the index of size
    productQuantity: [number]; // Quanitity for each size
    productMrp: [number]; //Mrp for each size
    productSp: [number]; // Selling price for each size
    productPhotos: [string]; //Minimum 6 photo is required we need to guide dukandar about how to take photo
}

export interface IProductColorModel extends Document {}
