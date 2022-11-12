import { IBill, IBillModel } from './billdesk.interface';
import { HTTP400Error, HTTP404Error } from '../../lib/utils/httpErrors';
import { Bill } from './billdesk.schema';
import { Request } from 'express';

interface Idata {
    quantity: Number;
    price: Number;
    itemId: String;
}
class BillModel {

    public checkBillProductExistOrNot = async(data:any)=>{
        try {
            const _id = data.shopId
            const productId = data.productId
            const fetchBill = await Bill.find({shopId:_id})

            const products = fetchBill.map((e:any)=>{
                return (e.products[0].productSize).toString()
            })
            const include = products.includes(productId)
            console.log("Lenghtyh",include)
            if(include === false){
                return false
            }else{
                return include
            }

        } catch (error:any) {
             throw new HTTP400Error("Bill not fethced",error.message);
        }
    }

    public createBill = async (data: IBill) => {
        try {
            const bill = new Bill(data);
            return await bill.save();
        } catch (error: any) {
            throw new HTTP400Error('Bill not created', error.message);
        }
    };

    public showBill = async (req: Request) => {
        const shopId = req.params.id;
        console.log('SHOP', shopId);

        try {
            const bill = await Bill.find({ shopId: shopId })?.populate({
                path: 'products',
                populate: [
                    {
                        path: 'productSize',
                        populate: [
                            {
                                path: 'productId',
                                populate: [
                                    {
                                        path: 'parentId colors',
                                        populate: [
                                            {
                                                strictPopulate: false,
                                                path: 'color',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            return bill;
        } catch (error: any) {
            throw new HTTP400Error(error.message);
        }
    };
    public updateBill = async (req: Request, data: Idata) => {
        const _id = req.params.id;
        const { quantity, price, itemId } = data;

        try {
            var update = { quantity, price, productSize: itemId };
            const updateBill = await Bill.findOneAndUpdate(
                {
                    _id: _id,
                    'products.productSize': data.itemId,
                },
                { $set: { 'products.$': update, totalPrice: Number(quantity) * Number(price) } },
            );
            return updateBill;
        } catch (error: any) {
            throw new HTTP400Error('Bill not updated', error.message);
        }
    };
    public deleteBillProduct = async (req: Request, data: Idata) => {
        const _id = req.params.id;
        const { itemId } = data;
        try {
            const updateBill = await Bill.findOneAndUpdate(
                {
                    _id: _id,
                },
                { $pull: { products: { productSize: itemId } } },
            );
            return updateBill;
        } catch (error: any) {
            throw new HTTP400Error('Bill not updated', error.message);
        }
    };
    public deleteBill = async (req: Request) => {
        const _id = req.params.id;

        try {
            const updateBill = await Bill.findByIdAndDelete({
                _id: _id,
            });

            return updateBill;
        } catch (error: any) {
            throw new HTTP400Error('Bill not deleted', error.message);
        }
    };
}

export default new BillModel();
