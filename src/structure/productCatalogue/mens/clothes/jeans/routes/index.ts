import filter from '../filter';
import classifiers from '../classifiers';
import size from '../product/size';
import color from '../product/color';
import product from '../product/product';

export default [...classifiers, ...filter, ...product, ...color, ...size];
