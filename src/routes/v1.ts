import shop from '../structure/shop';
import shopMember from '../structure/shopmember';
import productCatalogue from '../structure/catalogue/catalogue';
import product from '../structure/catalogue/product';
import productSize from '../structure/productSize';
import productColor from '../structure/productColor';
import address from '../structure/address';

export default [...shop, ...shopMember, ...productCatalogue, ...product, ...productSize, ...productColor, ...address];
