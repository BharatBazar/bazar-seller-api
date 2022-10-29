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
    
        if(shopId && itemId){

            const productSize = await ProductSize.find({shopId,itemId})
            ?.populate({
                    path:"productId",,
                    populate:[
                        {
                            path:"parentId colors",
                            populate:[
                                
                                {
                                    strictPopulate: false,
                                    path:"color",       
                                }
                            ]
                        }
                    ]
                })
                if(!productSize[0]){
                   throw new HTTP400Error('Item not listed');
                }
                else{
                    return productSize
                }
            
                
      
        }else{
            console.log("LP")
             throw new HTTP400Error('Please provide ShopId or itemId');
        }
     }else{
          throw new HTTP400Error('Data not exist');
     }
     
       
       
    }
}

export default new ProductSizeModel();
