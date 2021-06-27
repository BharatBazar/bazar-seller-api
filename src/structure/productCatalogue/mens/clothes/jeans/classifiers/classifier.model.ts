import { HTTP400Error } from '../../../../../../lib/utils/httpErrors';
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
}

export default new ClassifierModel();
