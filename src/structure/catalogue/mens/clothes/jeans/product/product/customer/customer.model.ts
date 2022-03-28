import { Types } from 'mongoose';
import { productStatus } from '../../../../../../product/product.interface';
import { JeansSize } from '../../size/size.schema';

class CustomerModel {
    public async getItemsOnApplyingFilter(data: { colors: [string]; sizes: [string],status: productStatus }) {
        let query = {};

        if (data['sizes']) {
            console.log('data', data["sizes"]);
            let sizes = data["sizes"].map((item) => Types.ObjectId(item));
            console.log("size",sizes)
           // return await JeansSize.find({size:{ $in :  sizes}})
            return await JeansSize.aggregate([
                { $match: {  size:{ $in :  data['sizes'].map((item) => Types.ObjectId(item)) } },
                { $group: { _id: '$productId', count: { $sum: 1 } } },
                {
                    $lookup: {
                        from: 'jeans',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'productDetail',
                        
                    },
                },
                {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$productDetail", 0 ] }, "$$ROOT" ] } }},
                {$project: { productDetail: 0 } },
                {$match : { status: data["status"]}},
                {
                    $lookup: {
                        
                        from: 'jeanscolors',
                        let: {"colors": "$colors"},
                        pipeline: [{$match: { '$expr': { '$in':['$_id',"$$colors"] }}, {$project: {color:1,_id:0},}],
                        as: "newcolors",
                    
                    },
                //   {
         
                //     $lookup: {
                //         from: 'shops',
                //         let: {"colors": "$colors"},
                //        pipeline: [{$match: { '$expr': { '$in':['$_id',"$$colors"] }}, {$project: {color:1,_id:0},}],
                //        as: "newcolors",
                //     },
                    
                //   $lookup: {
                //         from: 'jeansclassifiers',
                //         let: {"colors": "$newcolors"},
                //        pipeline: [{$match: { '$expr': { '$in':['$_id',"$$colors.color"] }}, {$project: {name:1}}],
                //        as: "newcolors",
                //     },

                    // $lookup: {
                    //     from: 'jeanscolors',
                    //     localField: 'colors',
                    //     foreignField: '_id',
                        
                    //     as: 'newcolors',
                        
                    // },
                },
               {
        $addFields: {
            newcolors1 : '$newcolors.color'
        }},
        {
           $lookup: {
                from: 'jeansclassifiers',
                        localField: 'newcolors1',
                        foreignField: '_id',
                        as: 'populatedColors',
           }
        
    },
     {$addFields: {
            newcolors2 : {name: '$populatedColors.name'}
        }},
        {
            $project: {
                newcolors1:0,populatedColors:0,newcolors:0
            }
        }
               

                // {
                //     $unwind: {
                //         path: '$productDetail',
                //     },
                // },
                //  {
                //     $unwind: {
                //         path: '$productDetail',
                //     },
                // },
            ]);
        }
    }
}

export default new CustomerModel();
