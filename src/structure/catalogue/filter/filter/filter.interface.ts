import { ObjectId } from '../../../../datatypes/index';
import { Document } from 'mongoose';
import { classifierTypes } from '../filtervalues/filtervalues.interface';

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: classifierTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can be selected or not
    //filterLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
    active: boolean; // It is used to active a filter and show it publically so that filter can through a verifying flow and all good then they are release to public

    /*
    filterActivatedCount: This is added to solve problem of incrementing totalFilterAdded count by 1
    it should only happen when filter is activated for the first time
    */
    filterActivatedCount: number;
    mandatory: boolean;
    customerHeading: string;
    customerDescription: string;
    customerImage: string;
    defaultSelectAll: boolean;
    parent: ObjectId;
    showSearch: boolean;
    key: string;
    filterLevel: number;
}

export interface IFilterModel extends Document, IFilter {}
