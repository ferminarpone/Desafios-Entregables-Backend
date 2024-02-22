import { productService } from "../../service.js";
import { cartModel } from "../models/carts.model.js";
import productsServices from "./products.services.js";

class CartServices {
  async getAllCarts() {
    return await cartModel.find();
  }

  async getCartById(id, products) {
    return await cartModel.findById(id).populate(products);
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

  async updateCart(cid, updateProducts) {
    try {
      const cart = await cartModel.findById(cid);
      cart.products = updateProducts;
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);
      const indexProduct = cart.products.findIndex(
        (prod) => prod.productId == pid
      );
      cart.products[indexProduct].quantity = quantity.quantity;
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async deleteProducts(cid) {
    try {
      const cart = await cartModel.findById(cid);
      cart.products = [];
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async createPurchase(cid) {
    try {
      const cart = await this.getCartById(cid, "products.productId");
      const amount = await this.stockControl(cart);
      console.log(amount); 
    } catch (e) {
      return res.json({
        error: e.message,
      });
    }
  }


  stockControl = async (cart) => {
    let amount = 0;
    for await (const el of cart.products) {
      const newStock = el.productId.stock - el.quantity;
      if (newStock >= 0) {
        // Esperar a que se actualice el producto
        const updatedProduct = await productsServices.updateProduct(el.productId._id, {
          stock: newStock,
        });
        amount = amount + el.quantity * el.productId.price
        console.log(el.productId.title)
        console.log(amount)
      }
    }
    return amount;
  };

}

export default new CartServices();

