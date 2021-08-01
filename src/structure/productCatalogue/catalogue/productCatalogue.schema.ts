import { model, Model, Schema, Types } from 'mongoose';
import { IProductCatalogueModel, categoryType } from './productCatalogue.interface';

const ProductCatalogueSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        categoryType: { type: String, enum: categoryType },
        subCategoryExist: { type: Boolean, default: false },
        parentRef: { type: Types.ObjectId, ref: 'ProductCatalogue', default: undefined },
        childRef: [{ type: Types.ObjectId, ref: 'ProductCatalogue', default: undefined }],
        activate: { type: Boolean, default: false },
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
