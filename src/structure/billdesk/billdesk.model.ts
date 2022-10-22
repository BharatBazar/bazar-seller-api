import { IBill, IBillModel } from './billdesk.interface';
import { HTTP400Error, HTTP404Error } from '../../lib/utils/httpErrors';
import { Bill } from './billdesk.schema';

class BillModel {
    public createBill = async (data: IBill) => {
        console.log('ALL_DATA', data);
        try {
            const bill = new Bill(data);
            console.log('BILL', bill);
            return await bill.save();
        } catch (error) {
            throw new HTTP400Error('Bill not created', error.message);
        }
    };

    public showBill = async (req) => {
        const id = req.params.id;

        try {
            const bill = await Bill.findById(id);
            return bill;
        } catch (error) {
            throw new HTTP400Error('Bill not created');
        }
    };
    public updateBill = async (req, data) => {
        console.log('UPDATE_DATA', data);
        const id = req.params.id;
        console.log('PP', id);

        try {
            const bill = await Bill.findByIdAndUpdate(id, data);
            //  $push: { products: data.k } }
            return bill;
        } catch (error) {
            throw new HTTP400Error('Bill not updated');
        }
    };
}

export default new BillModel();
