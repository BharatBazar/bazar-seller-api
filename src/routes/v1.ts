import shop from '../structure/shop';
import shopMember from '../structure/shopmember';
import productCatalogue from '../structure/catalogue/catalogue';
//import product from '../structure/catalogue/product';
// import productSize from '../structure/productSize';
// import productColor from '../structure/productColor';
import address from '../structure/address';
import productId from '../structure/shop/productId';
import billdesk from '../structure/billdesk';
import multimedia from '../structure/multimedia';

export default [
    ...shop,
    ...shopMember,
    ...productCatalogue,
    ...billdesk,
    // ...product,
    // ...productSize,
    // ...productColor,
    ...address,
    ...productId,
    ...multimedia,
];
