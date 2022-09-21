import filter from '../../../../filter/filter';
import filterValuess from '../../../../filter/filtervalues';
import size from '../product/size';
import color from '../product/colors';
import product from '../product/product';

export default [...filterValuess, ...filter, ...product, ...color, ...size];
