import fs from "fs";
import { ProductManager } from "../products/ProductManager.js";

export class CartManager {
  constructor(path) {
    this.path = path;
    try {
      let carts = fs.readFileSync(path, "utf-8");
      this.carts = JSON.parse(carts);
    } catch {
      this.carts = [];
    }
  }
  //Función que devuelve todos carritos que se encuentran en el manejador.
  getCarts() {
    return this.carts;
  }
  //Función que agrega carritos al arreglo de carritos inicial.
  async addCart(cart) {
    cart.id =
      this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
    this.carts.push(cart);
    const save = await this.saveFile(this.carts);
    if (save) {
      console.log(`El carrito con id ${cart.id} fue agregado exitosamente.`);
      return true;
    }
    throw Error("Se genero un error al agregar el carrito.");
  }

  //Función que guarda el nuevo array de productos en un archivo json.
  async saveFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return true;
    } catch (error) {
      return false;
    }
  }

  //Función que busca el carrito por "Id" en la lista de carritos.
  getCartById(idCart) {
    const fetch = this.carts.find((el) => el.id === idCart);
    if (!fetch) {
      throw Error(`No existe ningun carrito con id: ${idCart}`);
    } else {
      return fetch;
    }
  }

  //Función que agrega un producto a un carrito especificado por Id.
  async addProductCart(cartId, productId) {
    //Valido que exista el carrito de id cartId
    const cart = this.validateCart(cartId);
    //Valido que exista el producto con id productId
    this.validateProduct(productId);

    const searchProductCart = cart.products.find(
      (prod) => prod.id === productId
    );
    if (!searchProductCart) {
      cart.products = [...cart.products, { id: productId, quantity: 1 }];
    } else {
      cart.products.map((prod) => {
        if (prod.id === productId) {
          prod.quantity = prod.quantity + 1;
        }
      });
    }
    //Remplazo el objeto del carrito, por el nuevo objeto y luego lo guardo en el archivo json.
    const indexCart = this.carts.findIndex((cart) => cart.id === cartId);
    this.carts[indexCart] = cart;
    const save = await this.saveFile(this.carts);
    if (!save) {
      throw Error("Se genero un error al agregar el producto al carrito.");
    }
  }
  
  validateCart = (id) => {
    const cart = this.carts.find((el) => el.id === id);
    if (!cart) {
      throw Error(`No existe ningun carrito con id: ${id}`);
    }
    return cart;
  };

  validateProduct = (id) => {
    /* const dataProducts = new ProductManager("./src/data/Products.json");
    const products = dataProducts.getProducts();
    const fetchProduct = products.find((el) => el.id === id);
    if (!fetchProduct) {
      throw Error(`No existe ningun producto con id: ${id}`);

    } */
    try {
      const dataProducts = JSON.parse(
        fs.readFileSync("./src/data/Products.json", "utf-8")
      );
      const fetchProduct = dataProducts.find((el) => el.id === id);
      if (!fetchProduct) {
        throw Error(`No existe ningun producto con id: ${id}`);
      }
    } catch (e) {
      const dataProducts = null;
      if (!dataProducts) {
        throw Error("No existen productos en el manager de productos");
      }
    }
  };
}
