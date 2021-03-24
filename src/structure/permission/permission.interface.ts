import { Document } from 'mongoose';


export interface permissionSchemaInterface {
    createProduct: Boolean; //Adding product details
    editProduct: Boolean; //Updating product details
    rollOutProduct: Boolean; //Allow product to be seen by buyer
    talkToCustomer:Boolean; //Allow to recieve notification about the product related query and let them chat
    bookingNotification: Boolean; //Allow to get booking related notification
    createBill: Boolean; //Creating bill on shop
}

export interface IPermissionModel extends permissionSchemaInterface, Document {
    addPermission: Function
}