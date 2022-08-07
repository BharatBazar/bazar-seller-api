import { Document, Model, Types } from 'mongoose';

export enum productStatus {
    INVENTORY = 1,
    REJECTED = 2,
    OUTOFSTOCK = 3,
    WAITINGFORAPPROVAL = 4,
    LIVE = 5,
}

export const statusName = {
    1: 'Inventory',
    2: 'Rejected',
    3: 'Out of stock',
    4: 'Waiting for approval',
    5: 'Live',
};

export const statusDescription = {
    0: 'In this section the item which you have not completed yet.',
    1: 'Items which are completed and available in the inventory but not live. You can scan brcode and can do billing for them.',
    2: 'Items which are rejected from going live due to some problem.',
    3: 'Items which are out of stock currently',
    4: 'Items which you have applied for going live in the market. Our authority will check the product and will inform you if there is any problem related to product.',
    5: 'Items which are live in the market.Your grahak can check this items.',
};

/*
Indexing plans on this collection

1. A compound index will be created on parentId, shopId, status inorder to access product based on status
2. A component index on each filter field added to the product

*/

export interface ProductInterface {
    // General Properties //

    _id: Types.ObjectId;
    /*
    Parent means which catalogue this product belongs like
    mens jeans, women shoes etc. it refer to productCatalgoue
    schema.
    */
    parentId: Types.ObjectId;

    /*
    In which stage this product is.
    */
    status: productStatus;

    /*
    Which shop product belongs to.
    */
    shopId: Types.ObjectId;

    /*
    What are the color available in the product.
    */
    colors: Types.ObjectId[];

    /*
    Photo for identification of product by seller
    */
    sellerIdentificationPhoto: string;

    /*
    Best Photo will be selected out of all the photo
    provided by seller for customer identification
    */
    customerIdentificationPhoto: string;

    /*
    Future plan is to let customer provide any kind of description
    like text, image, audio, video etc.
    and then we will parse that description and provide description
    which will be shown to customer and also title accordingly.
    since its a tough task and require lot of setup it is currently
    on hold Sunday 7 August 2022
    */
    descriptionGivenByCustomer: string;
    descriptionShowToCustomer: string[];
    titleGenerated: string;

    // Product Settings //

    showPrice: boolean;
    new: boolean;
    newDeadline: Date;
    discount: [Number];
    discountDeadline: Date;
    createdAt: Date;
}

export interface IProductModelG extends Document, ProductInterface {}

export interface IProductModel extends Model<IProductModelG> {}
