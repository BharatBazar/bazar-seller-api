import { Types } from 'mongoose';
import { HTTP400Error, HTTP404Error } from '../../../../lib/utils/httpErrors';
import { IClassifierModel } from './filtervalues.interface';
import { Classifier } from './filtervalues.schema';

class ClassifierModel {
    public classifierExist = async (name: string) => {
        const exist = Classifier.findOne({ name }).countDocuments();
        return exist;
    };
    public createClassifier = async (data: IClassifierModel) => {
        const exist = await this.classifierExist(data.name);
        if (exist) {
            throw new HTTP400Error('Filter item already exist');
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
