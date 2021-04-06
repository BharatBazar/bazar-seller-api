import { model, Model, Schema, Types } from 'mongoose';
import { IProductCatalogueModel } from './productCatalogue.interface';

const ProductCatalogueSchema: Schema = new Schema(
    {
        _id: { type: String, unique: true },
        category: {
            type: [
                {
                    subCategory1: String,
                    subCategory2: [String],
                },
            ],
        },
    },
    { timestamps: true },
);

ProductCatalogueSchema.statics.ProductExist = async function (_id: string) {
    return (await ProductCatalogue.findById(_id).countDocuments()) > 0;
};

export const ProductCatalogue: Model<IProductCatalogueModel> = model<IProductCatalogueModel>(
    'ProductCatalogue',
    ProductCatalogueSchema,
);
