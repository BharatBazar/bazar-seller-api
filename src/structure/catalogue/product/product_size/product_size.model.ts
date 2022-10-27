import { Types } from 'mongoose';
import { IId } from '../../../../config';
import productColorModel from '../product_color/product_color.model';
import { ProductColor } from '../product_color/product_color.schema';
import { HTTP400Error } from '../../../../lib/utils/httpErrors';
import { ProductSizeModelInterface, ProductSizeInterface } from './product_size.interface';
import { ProductSize } from './product_size.schema';
import productModel from '../product/product.model';
import e from 'express';

class ProductSizeModel {
    public async createProductSize(data: ProductSizeInterface & ) {
        if (data.parentId) {
            const size: ProductSizeModelInterface = new ProductSize(data);

          
            let sizes: [Types.ObjectId] = [];
            sizes.push(size._id);
            await productColorModel.updateProductColor({ sizes, _id: data.parentId });
            await size.save();
            return size;
        } else {
            throw new HTTP400Error('Please provide parentId.');
        }
    }

    public async updateProductSize(data: ProductSizeInterface) {
        const exist = (await ProductSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await ProductSize.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async deleteProductSize(data: IId & { parentId?: Types.ObjectId }) {
        console.log(data);
        const exist = (await ProductSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            if (data.parentId) {
                await ProductColor.findByIdAndUpdate(data.parentId, { $pull: { sizes: data._id } });
            }
            await ProductSize.findByIdAndDelete(data._id);
            return;
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }

    public async getProductSize(data: IId) {
        const exist = (await ProductSize.findById(data._id).countDocuments()) > 0;
        if (exist) {
            return await ProductSize.findById(data._id);
        } else {
            throw new HTTP400Error('Product size does not found.');
        }
    }
    public async getItems(data: any) {
     if(data !== null || undefined){
            const {shopId,itemId} = data
        const productSize = await ProductSize.find({shopId})
         if(productSize){
                const findItemId = productSize.find(e=>e.itemId === itemId)?.populate({
                    path:"productId",
                    populate:[
                        {
                            path:"colors",
                            populate:[
                                {
                                    path:"color sizes"
                                }
                            ]
                        }
                    ]
                })
                if(findItemId === undefined || null){
                    throw new HTTP400Error('Item not exist !!');
                }
                return findItemId
        }else{
            throw new HTTP400Error('Product size does not occur.');
        }
      
     }else{
          throw new HTTP400Error('Data not exist');
     }
     
       
       
    }
}

export default new ProductSizeModel();
