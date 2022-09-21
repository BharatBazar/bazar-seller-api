import { IProductModel, IProductModelG } from './product.interface';
import { model, Schema, Types } from 'mongoose';
import { productStatus } from './product.interface';

export const ProductSchema: Schema = new Schema(
    {
        shopId: { type: Types.ObjectId, ref: 'Shop' },
        status: { type: String, enum: productStatus, default: productStatus.INVENTORY },
        parentId: { type: Types.ObjectId, ref: 'ProductCatalogue' },
        colors: { type: [Types.ObjectId], ref: 'ProductColor' },
        sellerIdentificationPhoto: String,
        customerIdentificationPhoto: String,
        descriptionGivenByCustomer: String,
        descriptionShownToCustomer: String,
        titleGenerated: String,
        showPrice: { type: Boolean, default: false },
        productRating: Number,
        new: Boolean,
        newDeadline: Date,
        discount: [Number],
        discountDeadline: [Date],
        note: { type: [String], default: [] },

        //Mens Jeans Filter
        mens_footwear_sneaker_brand: { type: [Types.ObjectId], ref: 'FilterValues' },
        mens_footwear_sneaker_color: { type: [Types.ObjectId], ref: 'FilterValues' },
        mens_footwear_sneaker_size: { type: [Types.ObjectId], ref: 'FilterValues' },
    },
    {
        timestamps: true,
    },
);

ProductSchema.index({ parentId: 1, shopId: 1, status: 1 });
ProductSchema.index({ parentId: 1, status: 1, _id: 1 });
ProductSchema.index({ parentId: 1, status: 1, shopId: 1, mens_jeans_brand: 1 });

export const Product: IProductModel = model<IProductModelG, IProductModel>('Product', ProductSchema);
