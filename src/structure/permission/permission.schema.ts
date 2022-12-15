import { Model, model, Schema } from 'mongoose';

import { IShopPermissionModel } from './permission.interface';

const ShopPermissionSchema: Schema = new Schema(
    {
        createProduct: { type: Boolean, default: false },
        editProduct: { type: Boolean, default: false },
        rollOutProduct: { type: Boolean, default: false },
        talkToCustomer: { type: Boolean, default: false },
        bookingNotification: { type: Boolean, default: false },
        createBill: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

ShopPermissionSchema.methods.addPermission = async function () {
    return this.save();
};

export const ShopPermissions: Model<IShopPermissionModel> = model<IShopPermissionModel>(
    'Permission',
    ShopPermissionSchema,
);
