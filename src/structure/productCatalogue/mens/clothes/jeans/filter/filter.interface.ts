import { classifierTypes } from '../classifier/classifier.interface';

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: classifierTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can selected or not
    distributionLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
}
