import { IPermissionModel, permissionSchemaInterface } from './permission.interface';
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

PermissionSchema.methods.addPermission = async function () {
    return this.save();
}

const Permissions: Model<IPermissionModel> = model<IPermissionModel>('permissions',PermissionSchema);

export default Permissions;