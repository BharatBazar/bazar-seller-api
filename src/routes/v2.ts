import FilterValue from '../structure/catalogue/filter/filtervalues';
import Filter from '../structure/catalogue/filter/filter';
import Product from '../structure/catalogue/product/product';
import ProductColor from '../structure/catalogue/product/product_color';
import ProductSize from '../structure/catalogue/product/product_size';

export default [...FilterValue, ...ProductSize, ...Product, ...Filter, ...ProductColor];

// import Product from '../structure/productCatalogue/mens/clothes/jeans/routes';

// export default [...Product];
