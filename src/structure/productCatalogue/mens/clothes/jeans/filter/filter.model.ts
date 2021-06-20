import { filterType } from './../../../footwear/filter/filter/size/size.interface';
import { IFilter } from '../../../footwear/filter/filter.interface';

class JeansFilterModel {
    public async getJeansFilter() {
        const categoryDistibution = ['Colors', 'Size'];
        const distribution: Partial<IFilter>[] = new Array(categoryDistibution.length);
        let filters: IFilter[] = [];

        [
            {
                name: 'Size',
                value: ['28', '30'],
                filterType: 'DropDown',
                unit: 'cm',
                description: 'Select size in the filter',
            },
            {
                name: 'Colors',
                value: ['28', '30'],
                filterType: 'DropDown',
                unit: 'cm',
                description: 'Select size in the filter',
            },
        ].forEach((item) => {
            let index = categoryDistibution.indexOf(item.name);
            if (index > -1) {
                distribution[index] = item;
            } else {
                filters.push(item);
            }
        });

        return {
            filters,
            distribution,
        };
    }
}

export default new JeansFilterModel();
