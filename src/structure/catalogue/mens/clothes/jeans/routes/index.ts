import filter from '../../../../filter/filter';
import classifiers from '../../../../filter/filtervalues';
import size from '../product/size';
import color from '../product/colors';
import product from '../product/product';

export default [...classifiers, ...filter, ...product, ...color, ...size];
