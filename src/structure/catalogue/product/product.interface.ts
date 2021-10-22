import { Date, Types, Document, Model } from 'mongoose';

export enum productStatus {
    NOTCOMPLETED = 0,
    INVENTORY = 1,
    REJECTED = 2,
    OUTOFSTOCK = 3,
    WAITINGFORAPPROVAL = 4,
    LIVE = 5,
}

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
}

export interface IProductModelG extends Document, Product {}

export interface IProductModel extends Model<IProductModelG> {
    productIdExist: (_id: Types.ObjectId) => Promise<IProductModelG>;
}
