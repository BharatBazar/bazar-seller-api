import MensJeansClassifiers from '../structure/productCatalogue/mens/clothes/jeans/classifiers';
import MensJeansFilters from '../structure/productCatalogue/mens/clothes/jeans/filter';
import MensJeans from '../structure/productCatalogue/mens/clothes/jeans/product/product';
import MensJeansColor from '../structure/productCatalogue/mens/clothes/jeans/product/color';
import MensJeansSize from '../structure/productCatalogue/mens/clothes/jeans/product/size';

export default [...MensJeansFilters, ...MensJeansSize, ...MensJeans, ...MensJeansClassifiers, ...MensJeansColor];

// import Jeans from '../structure/productCatalogue/mens/clothes/jeans/routes';

// export default [...Jeans];
