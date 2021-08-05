import { Types } from 'mongoose';
import { HTTP400Error, HTTP404Error } from '../../../../../../lib/utils/httpErrors';
import { IClassifierModel } from './classifier.interface';
import { Classifier } from './classifier.schema';

class ClassifierModel {
    public classifierExist = async (name: string) => {
        const exist = Classifier.findOne({ name }).countDocuments();
        return exist;
    };
    public createClassifier = async (data: IClassifierModel) => {
        const exist = await this.classifierExist(data.name);
        if (exist) {
            throw new HTTP400Error('Classifier already exist');
        } else {
            const classifier = new Classifier(data);
            await classifier.save();
            return classifier;
        }
    };

    public getClassifier = async (data: IClassifierModel) => {
        return await Classifier.find();
    };

    public updateClassifier = async (data: IClassifierModel & { _id: Types.ObjectId }) => {
        const exist = await Classifier.findByIdAndUpdate(data._id, data);
        if (exist) {
            return 'Classifier updated';
        } else {
            throw new HTTP404Error('Classifier not found!');
        }
    };
}

export default new ClassifierModel();
