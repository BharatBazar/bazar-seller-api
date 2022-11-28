import { Document, Types } from 'mongoose';

export interface ProductColorI {
    /*
    Refers to product which it belongs
    */
    productId: Types.ObjectId;

    /*
    Parentid means which catalogue this product belongs like
    mens jeans, women, shoes etc. it refer to productCatalgoue
    schema.
    */
    parentId: Types.ObjectId;

    /*
    Refers to filter value to identify the color
    */
    color: Types.ObjectId;

    /*
    Sizes which are inside the color
    */
    sizes: [Types.ObjectId];

    /*
    Photos of this particular color
    */
    photos: [string];

    /*
    Other color in this color
    */
    includedColor: [Types.ObjectId];

    /*
    Main photo to identify the color with
    */
    identificationPhoto: string;

    /*
    Shop to which this product belongs
    */
    shopId: Types.ObjectId;

    createdAt: Date;
    _id: Types.ObjectId;
}

export interface ProductColorModelInterface extends Document, ProductColorI {}
