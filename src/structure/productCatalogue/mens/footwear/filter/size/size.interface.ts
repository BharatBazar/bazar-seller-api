import { Document } from 'mongoose';

export enum sizeType {
    JeanSize = 'JeansSize',
}

export enum unitType {
    Cm = 'Cm',
}

interface Size {
    value: string;
    unit: unitType;
    sizeType: sizeType;
}

export interface ISizeModel extends Document, Size {}
