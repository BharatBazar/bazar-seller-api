import { IPermissionModel } from './permission.interface';
import { Schema, model, Model } from 'mongoose';

const PermissionSchema:Schema = new Schema({
    createProduct: {type: Boolean, default:false},
    editProduct: {type: Boolean, default:false},
    rollOutProduct: {type: Boolean, default:false},
    talkToCustomer: {type: Boolean, default:false},
    bookingNotifiation: {type: Boolean, default:false},
    createBill: {type: Boolean, default:false}
},{
    timestamps:true
});

PermissionSchema.methods.addPermission = async function () {
    return this.save();
}

export const Permissions: Model<IPermissionModel> = model<IPermissionModel>('permission',PermissionSchema);
