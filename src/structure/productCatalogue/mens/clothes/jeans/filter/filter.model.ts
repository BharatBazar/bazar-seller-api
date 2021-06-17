class JeansFilterModel {
    public async getJeansFilter() {
        return [
            {
                name: 'Size',
                value: ['28', '30'],
                unit: 'cm',
                description: 'Select size in the filter',
            },
        ];
    }
}

export default new JeansFilterModel();
