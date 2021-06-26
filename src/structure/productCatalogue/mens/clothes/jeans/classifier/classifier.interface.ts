export enum classifierTypes {
    SIZE = 'Size',
    COLOR = 'Color',
    BRAND = 'Brand',
    PATTERN = 'Pattern',
    FIT = 'Fit',
}

export interface IClassfier {
    name: string; // Name should be any thing like value for example for size name will be 28, for color name will be red etc..
    description: string; // Description should be meta data or for example for color colorCode will be description, for size unit like cm or inch will be description
    image: string; // Can be provided for pattern or brand etc..
    type: classifierTypes; //type is the classifier to which the document belongs
}
