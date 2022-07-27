import { Types } from 'mongoose';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IClassifierModel } from './filtervalues.interface';
import { Classifier } from './filtervalues.schema';

class ClassifierModel {
    public classifierExist = async (name: string, parent: string, type: string) => {
        const exist = await Classifier.findOne({ name }).countDocuments();
        //     const exist = await Classifier.find({ parent:parent })
        //     console.log("EXIIIIS",exist)

        //    const y = exist.map((e)=>{
        //         return e.type===type ?true :false
        //     })
        //    return y
        return exist;
    };
    public createClassifier = async (data: IClassifierModel) => {
        const exist = await this.classifierExist(data.name, data.parent, data.type);
        if (exist) {
            throw new HTTP400Error('Filter item already exist or have written same type');
        } else {
            const classifier = new Classifier(data);
            await classifier.save();
            return classifier;
        }
    };

    public deleteClassifier = async (data: IClassifierModel) => {
        const exist = await Classifier.findById(data._id);
        if (exist) {
            await Classifier.findByIdAndDelete(data._id);
        } else {
            throw new HTTP400Error('Filter item does not exist');
        }
    };

    public getClassifier = async (data: IClassifierModel) => {
        console.log(data);
        return await Classifier.find(data);
    };

    public updateClassifier = async (data: IClassifierModel & { _id: Types.ObjectId }) => {
        const exist = await Classifier.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Filter item updated';
        } else {
            throw new HTTP404Error('Filter item not found!');
        }
    };
}

export default new ClassifierModel();
