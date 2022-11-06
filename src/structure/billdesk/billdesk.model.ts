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
            console.log('UP', updateBill);
            return updateBill;
        } catch (error: any) {
            throw new HTTP400Error('Bill not updated', error.message);
        }
    };
}

export default new BillModel();
