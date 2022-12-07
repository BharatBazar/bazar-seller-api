import { Date, Types, Document, Model } from 'mongoose';

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
    5: 'Items which are live in the market.Your grahak can check this items.',
    0: 'In this section the item which you have not completed yet.',
    1: 'Items which are completed and available in the inventory but not live. You can scan brcode and can do billing for them.',
    4: 'Items which you have applied for going live in the market. Our authority will check the product and will inform you if there is any problem related to product.',
    2: 'Items which are rejected from going live due to some problem.',

    3: 'Items which are out of stock currentlty',
};

export interface Product {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.

    shopId: Types.ObjectId;
    //Above field will have predifined information about the size, unit etc.
    title: string; //It can be possible that a shop sells particular brand items on their shop.
    subTitle: string;
    color: [Types.ObjectId];
    showPrice: boolean; //Whether dukandar wants to show price to customer or not
    productStatus: productStatus;
    rating: number;
    new: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available s
    newDeadline: Date;
    description: string; // Will be a audio as audio is better to understand in common language
    discount: [number]; // If a dukandar has decided that he wants to give special discount on particular  so discount will for each color
    discountDeadline: [Date];
    bazarAssured: boolean; // It is the flag if we have personally verified the product and it is really a good product
    descriptionCustomer: string;
    releaseDate: string;
    note: [string]; //Note provided by us during rejection or approval
    alreadyRejected: boolean; // If product is rejected one time
    updatedAt: Date;
    createdAt: Date;
}

export interface IProductModelG extends Document, Product {}

export interface IProductModel extends Model<IProductModelG> {
    productIdExist: (_id: Types.ObjectId) => Promise<IProductModelG>;
}
