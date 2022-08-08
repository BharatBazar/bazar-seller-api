import FilterValue from '../structure/catalogue/filter/filtervalues';
import Filter from '../structure/catalogue/filter/filter';
import Product from '../structure/catalogue/mens/clothes/jeans/product/product';
import ProductColor from '../structure/catalogue/mens/clothes/jeans/product/colors';
import ProductSize from '../structure/catalogue/mens/clothes/jeans/product/size';

export default [...FilterValue, ...ProductSize, ...Product, ...Filter, ...ProductColor];

// import Product from '../structure/productCatalogue/mens/clothes/jeans/routes';

// export default [...Product];
