import { Document } from 'mongoose';


export interface permission {type: boolean, default: false}

interface permissionSchemaInterface {
    createProduct: permission; //Adding product details
    editProduct: permission; //Updating product details
    rollOutProduct: permission; //Allow product to be seen by buyer
    talkToCustomer:permission; //Allow to recieve notification about the product related query and let them chat
    bookingNotification: permission; //Allow to get booking related notification
    createBill: permission; //Creating bill on shop
}

export interface IPermissionModel extends permissionSchemaInterface, Document {

}