import { IProductModel, IProductModelG } from './product.interface';
import { model, Schema, Types } from 'mongoose';
import { productStatus } from './product.interface';

export const ProductSchema: Schema = new Schema(
    {
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        status: { type: String, enum: productStatus, default: productStatus.INVENTORY },
        parentId: { type: Types.ObjectId, ref: 'ProductCatalogue' },
        colors: { type: Types.ObjectId, ref: 'ProductColor' },
        sellerIdentificationPhoto: String,
        customerIdentificationPhoto: String,
        descriptionGivenByCustomer: String,
        descriptionShowToCustomer: String,
        titleGenerated: String,
        showPrice: { type: Boolean, default: false },
        productRating: Number,
        new: Boolean,
        newDeadline: Date,
        discount: [Number],
        discountDeadline: [Date],
        note: { type: [String], default: [] },
    },
    {
        timestamps: true,
    },
);

ProductSchema.index({ parentId: 1, shopId: 1, status: 1 });
ProductSchema.index({ parentId: 1, status: 1, _id: 1 });

export const Product: IProductModel = model<IProductModelG, IProductModel>('Product', ProductSchema);
