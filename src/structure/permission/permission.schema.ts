import { permission, IPermissionModel } from './permission.interface';
import { Schema, model, Model } from 'mongoose';

const permission = {type: Boolean, default:false};
const PermissionSchema:Schema = new Schema({
    createProduct: permission,
    editProduct: permission,
    rollOutProduct: permission,
    talkToCustomer: permission,
    bookingNotifiation: permission,
    createBill: permission
});

export const PermisisonModel: Model<IPermissionModel> = model<IPermissionModel>('permissions',PermissionSchema);