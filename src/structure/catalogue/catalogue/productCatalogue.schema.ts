import { model, Model, Schema, Types } from 'mongoose';
import { IProductCatalogueModel, categoryType } from './productCatalogue.interface';

const ProductCatalogueSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        customer_name: String,
        customer_description: String,
        customer_image: String,
        subCategoryExist: { type: Boolean, default: false },
        parent: { type: Types.ObjectId, ref: 'ProductCatalogue', default: undefined },
        path: [{ type: Types.ObjectId, ref: 'ProductCatalogue', default: undefined }],
        child: [{ type: Types.ObjectId, ref: 'ProductCatalogue', default: undefined }],
        active: { type: Boolean, default: false },
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
