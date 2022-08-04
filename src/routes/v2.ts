import MensJeansClassifiers from '../structure/catalogue/filter/filtervalues';
import MensJeansFilters from '../structure/catalogue/filter/filter';
import MensJeans from '../structure/catalogue/mens/clothes/jeans/product/product';
import MensJeansColor from '../structure/catalogue/mens/clothes/jeans/product/colors';
import MensJeansSize from '../structure/catalogue/mens/clothes/jeans/product/size';

export default [...MensJeansFilters, ...MensJeansSize, ...MensJeans, ...MensJeansClassifiers, ...MensJeansColor];

// import Jeans from '../structure/productCatalogue/mens/clothes/jeans/routes';

// export default [...Jeans];
