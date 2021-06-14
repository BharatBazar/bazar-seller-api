import { Product } from '../../../product/product.interface';

export interface Jeans extends Product {
    brand: string; //Brand to which jeans belong
    size: string; //Size of jeans can be a number or string
    pattern: string; //It is the various pattern like damaged etc..
    fabric: string; //Like cotton fabric etc
    discount: string;
    fit: string;
}
