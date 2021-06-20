export enum filterType {
    DropDown = 'DropDown',
    Tags = 'Tags',
    CheckBox = 'CheckBox',
}

export interface IFilter {
    name: string;
    description: string;
    filterType: filterType;
    value: {
        name: string;
    };
}
