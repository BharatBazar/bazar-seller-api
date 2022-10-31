import { IBill, IBillModel } from './billdesk.interface';
import { HTTP400Error, HTTP404Error } from '../../lib/utils/httpErrors';
import { Bill } from './billdesk.schema';
import { Request } from 'express';

interface Idata {
    quantity: Number;
    price: Number;
}
class BillModel {
    // public createBill = async (data: IBill) => {
    //     try {
    //         const shopId = data.shopId;
    //         const exist = await Bill.find({ shopId });
    //         // console.log(
    //         //     'EXIST',
    //         //     exist[0].products.map((e) => {
    //         //         return console.log('IDS', e.productSize === data.products[0].productSize);
    //         //     }),
    //         // );
    //         if (exist[0]) {
    //             const firstCheck = exist[0].products.map((e) => {
    //                 return String(e.productSize);
    //             });

    //             const secondCheck = data.products.map((e) => {
    //                 return e.productSize;
    //             });

    //             const mapCheck = firstCheck.map((e) => {
    //                 return e === secondCheck[0];
    //             });

    //             console.log('FIRST_CHECK', firstCheck);
    //             console.log('SECOND_CHECK', secondCheck);
    //             console.log('MAP_CHECK', mapCheck);
    //             return firstCheck;
    //             // const getConfirmation = exist[0].products;
    //             // console.log('CONFIRM', getConfirmation);
    //         } else {
    //             const bill = new Bill(data);
    //             return await bill.save();
    //         }
    //     } catch (error) {
    //         throw new HTTP400Error('Bill not created', error.message);
    //     }
    // };
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
        console.log('OP', _id);
        console.log('DATA', data);

        try {
            const bill = await Bill.findById(_id);
            var update = { quantity: data.quantity, price: data.prices, productSize: data.itemId };
            const updateBill = await Bill.updateOne(
                { 'products.productSize': data.itemId },
                { $set: { 'products.$': update } },
            );
            return updateBill;
        } catch (error: any) {
            throw new HTTP400Error('Bill not updated', error.message);
        }
    };
}

export default new BillModel();
