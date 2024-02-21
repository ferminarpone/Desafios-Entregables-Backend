import CartServices from "./dbManager/dao/carts.services.js";
import ProductServices from "./dbManager/dao/products.services.js";
import CartsRepository from "./repository/carts.repository.js";
import ProductsRepository from "./repository/products.repository.js";

export const productService = new ProductsRepository(ProductServices);
export const cartService = new CartsRepository(CartServices); 
