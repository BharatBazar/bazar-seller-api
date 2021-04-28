import { IProductCatalogueModel } from './../productCatalogue/productCatalogue.interface';
import { Schema, model } from 'mongoose';
import { ICategory, IShopCatalogueModel, IShopCatalogueModelG } from './shopCatalogue.interface';

const ShopCatalogueSchema: Schema = new Schema(
    {
        category: String,
        subCategory: String,
        subCategory1: { type: String, unique: true },
        shopIds: [{ type: String, ref: 'Shop', unique: true }],
    },
    { timestamps: true },
);

ShopCatalogueSchema.statics.categoryExistOrNot = async function (data: ICategory) {
    return (await this.findOne(data).countDocuments()) > 0;
};

export const ShopCatalogue: IShopCatalogueModel = model<IShopCatalogueModelG, IShopCatalogueModel>(
    'ShopCatelogue',
    ShopCatalogueSchema,
);
