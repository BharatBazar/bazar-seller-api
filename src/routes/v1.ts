import shop from '../structure/shop';
import shopMember from '../structure/shopmember';
import productCatalogue from '../structure/productCatalogue/catalogue';
import product from '../structure/productCatalogue/product';
import productSize from '../structure/productSize';
import productColor from '../structure/productColor';
import address from '../structure/address';

export default [...shop, ...shopMember, ...productCatalogue, ...product, ...productSize, ...productColor, ...address];
