import { Types } from 'mongoose';
import { JeansSize } from '../size/size.schema';

class ProductCustomerModel {
    public async getItemsOnApplyingFilter(data: { colors: [string]; sizes: [string] }) {
        let query = {};
        if (data['sizes']) {
            return await JeansSize.aggregate([
                { $match: { size: data['sizes'].map((item) => Types.ObjectId(item)) } },
                { $group: { _id: '$productId', count: { $sum: 1 } } },
                {
                    $lookup: {
                        from: 'Jeans',
                        localField: 'productId',
                        foreignFiend: '_id',
                        as: 'productDetail',
                    },
                },
                {
                    $unwind: {
                        path: 'productDetail',
                    },
                },
            ]);
        }
    }
}

export default new ProductCustomerModel();
