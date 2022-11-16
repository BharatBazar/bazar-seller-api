import { ObjectId } from '../../../../datatypes/index';
import { Document } from 'mongoose';
import { filterValuesTypes } from '../filtervalues/filtervalues.interface';

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url

    customerHeading: string;
    customerDescription: string;
    customerImage: string;

    //type: filterValuesTypes; // It will refer to the type to which the filter belongs

    /*
     * IF MULTIPLE VALUE CAN BE SELECTED FOR THIS FITLER FOR A PRODUCT
     */
    multiple: boolean;

    /*
     * Basically this tells if filter is a main category or not like color
     * or like other filter can rendered normally
     * 0 means filter only
     * 1 means It is top level distribution like color
     * 2 means inside distibution that is size or etc.
     */
    filterLevel: number;

    /*
     * It is used to active a filter and show it publically so
     * that filter can through a verifying flow and all good then
     * they are release to public
     */
    active: boolean;

    /*
    filterActivatedCount: This is added to solve problem of incrementing totalFilterAdded count by 1
    it should only happen when filter is activated for the first time as filter can be activated or deactivated 
    several times
    */
    filterActivatedCount: number;

    /*
     * THIS TELLS THAT FILTER NEED TO BE PROVIDED WHILE PRODUCT LISTING
     */
    mandatory: boolean;

    /*
     * IF THIS IS TRUE THEN ALL THE FILTER VALUE FOR THIS FILTER WILL BE
     * DEFAULT SELECTED WHEN SELLER IS PROVIDING FILTER FOR HIS SHOP
     */
    defaultSelectAll: boolean;

    /*
     * PARENT IS BASICALLY CATALOGUE TO WHICH THIS FILTER BELONGS
     */
    parent: ObjectId;

    /*
     * IF THIS IS SET AS TRUE THEN A SEARCH WILL OPEN WHEN SELLER IS PROVIDING
     * FILTER VALUE FOR HIS SHOP FOR THIS PARTICULAR FILTER
     */
    showSearch: boolean;

    /*
     * THIS IS UNIQUE IDENTIFICATION FOR EVERY FILTER
     */
    key: string;
}

export interface IFilterModel extends Document, IFilter {}
