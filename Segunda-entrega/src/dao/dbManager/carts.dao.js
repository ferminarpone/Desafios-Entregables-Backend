import { cartModel } from "../../models/carts.model.js";

class CartDao {
  async getAllCarts() {
    return await cartModel.find();
  }

  async getCartById(id /* , products */) {
    return await cartModel.findById(id) /* .populate(products) */;
  }

  async createCart(cart) {
    return await cartModel.create(cart);
  }

  async addProductInCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const searchProduct = cart.products.find((prod) => prod.productId == pid);
    if (!searchProduct) {
      cart.products = [...cart.products, { productId: pid, quantity: 1 }];
    } else {
      cart.products.map((prod) => {
        if (prod.productId == pid) {
          prod.quantity = prod.quantity + 1;
        }
      });
    }
    return await cartModel.findByIdAndUpdate(cid, cart);
  }

  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      const productIndex = cart.products.findIndex(
        (prod) => prod.productId == pid
      );
      const removeProduct = cart.products.splice(productIndex, 1);
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async updateCart(cid, updateProducts){
    try{
      const cart = await cartModel.findById(cid);
      cart.products = updateProducts;
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (e) {
      throw Error(e.message);
    }
  }
}

export default new CartDao();
