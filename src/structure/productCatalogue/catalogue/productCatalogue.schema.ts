import { model, Model, Schema, Types } from 'mongoose';
import { IProductCatalogueModel, categoryType } from './productCatalogue.interface';

const ProductCatalogueSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        categoryType: { type: String, enum: categoryType },
        subCategoryExist: Boolean,
        parentRef: { type: Types.ObjectId, ref: 'ProductCatalogue' },
        childRef: { type: Types.ObjectId, ref: 'ProductCatalogue' },
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
