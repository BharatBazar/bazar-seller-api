import { Types, Document } from 'mongoose';

export enum idCreationStatus {
    'NotCreated' = 0,
    'CreatedNotProvided' = 1,
    'CreatedAndProvided' = 2,
}
export interface ProductSizeInterface {
    /*
    Will refer to Filter values table
    to identify the value of size
    */
    size: Types.ObjectId;

    /*
    How many pieces of this product is there
    in the shop
    */
    quantity: string;

    /*
     * Will enable later
     * sp: string;
     */

    /*
     * Will enable later
     * mrp: string;
     */

    parentId: Types.ObjectId;

    /*
    This is a itemId that we will generated
    so that our system can identify the product
    easily and do updation on it
    */
    itemId: string;

    shopId: string;
}

export interface ProductSizeModelInterface extends Document, ProductSizeInterface {}
