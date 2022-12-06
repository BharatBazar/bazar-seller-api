import { ObjectId, Types } from 'mongoose';
import { Filter } from './filter.schema';

class FilterCustomerModel {
    public getFilterWithValue = async ({ parent }: { parent: string }) => {
        const product = await Filter.aggregate([
            {
                $match: { parent: Types.ObjectId(parent), active: true },
            },
            {
                $project: { customerHeading: 1, customerDescription: 1, type: 1 },
            },
            {
                $lookup: {
                    from: 'filtervalues',
                    pipeline: [
                        {
                            $match: {
                                active: true,
                            },
                        },
                        { $project: { customerName: 1, customerDescription: 1, type: 1 } },
                    ],
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'values',
                },
            },
            // {
            //     $unwind: '$values',
            // },
        ]);

        console.log('Product', product, parent);

        return product;
    };
}

export default new FilterCustomerModel();
