import { ticketService } from "../../service.js";
import { cartModel } from "../models/carts.model.js";
import { ticketModel } from "../models/ticket.model.js";
import productsServices from "./products.services.js";
import userServices from "./user.services.js";

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
      const productIndex = cart.products.findIndex((prod) =>
        prod.productId.equals(pid)
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
      const newCart = await this.stockControl(cart);
      const cartId = cart._id;
      const user = await userServices.getUser({ cart: cartId });
      const ticket = await this.createTicket(newCart, user);
      const secondcart = await this.getCartById(cid, "products.productId");
      return secondcart;
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  }

  stockControl = async (cart) => {
    let purchaseCart = [];
    for await (const el of cart.products) {
      const newStock = el.productId.stock - el.quantity;
      if (newStock >= 0) {
        const pid = el.productId._id;
        const cartNew = await this.deleteProductInCart(cart._id, pid);
        // Esperar a que se actualice el producto
        const amount = el.quantity * el.productId.price;
        const updatedProduct = await productsServices.updateProduct(
          el.productId._id,
          {
            stock: newStock,
          }
        );
        const purchaseProduct = { updatedProduct, amount };
        purchaseCart.push(purchaseProduct);
      }
    }
    return purchaseCart;
  };

  async createTicket(cart, user) {
    const totalAmount = cart.reduce((acumulador, objeto) => {
      return acumulador + objeto.amount;
    }, 0);
    const ticket = {
      amount: totalAmount,
      purchaser: user.email,
      purchase_datetime: new Date(),
      products: cart
    };
    return await ticketService.createTicket(ticket);
  }
}

export default new CartServices();
