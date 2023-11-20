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
    const cart = this.carts.find((el) => el.id === cartId);
    if (!cart) {
      throw Error(`No existe ningun carrito con id: ${cartId}`);
    }
    //Instancio ProductManager? o leo directamente el archivo?
    const dataProducts = new ProductManager("./src/data/Products.json");
    const products = dataProducts.getProducts();
    /*   const dataProducts= JSON.parse(fs.readFileSync("./src/data/Products.json", "utf-8")); */
    const fetchProduct = products.find((el) => el.id === productId);
    if (!fetchProduct) {
      throw Error(`No existe ningun producto con id: ${productId}`);
    }

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

    const indexCart = this.carts.findIndex((cart) => cart.id === cartId);

    this.carts[indexCart] = cart;

    const save = await this.saveFile(this.carts);
    if (save) {
      console.log(
        `El producto con id ${productId} fue agregado exitosamente al carrito con id ${cartId}`
      );
      return true;
    }
    throw Error("Se genero un error al agregar el producto al carrito.");
  }

  /* 

  //Función que actualiza los datos de un producto existente.
  async updateProduct(idProducto, newProduct) {
    const indice = this.products.findIndex(
      (product) => product.id === idProducto
    );
    if (indice < 0) {
      throw Error(
        `El producto de id: ${idProducto}, no existe en el manejador de productos.`
      );
    }
    this.products[indice] = { ...newProduct, id: idProducto };
    const saveUpdate = await this.saveFile(this.products);
    if (saveUpdate) {
      console.log(
        `El producto con id ${idProducto} fue actualizado exitosamente.`
      );
      return true;
    }
    throw Error("Se produjo un error al actualizar el producto.");
  }
  //Función que elimina un producto existente en el archivo.
  async deleteProduct(idProducto) {
    const indice = this.products.findIndex(
      (product) => product.id === idProducto
    );
    if (indice < 0) {
      console.log("El producto que desea eliminar, no existe.");
      throw Error(" El producto que desea eliminar, no existe");
    }
    this.products.splice(indice, 1);
    const save = await this.saveFile(this.products);
    if (save) {
      console.log(
        `El producto con id ${idProducto} fue eliminado exitosamente.`
      );
      return true;
    }
    throw Error("Se produjo un error al eliminar el producto.");
  } */

  /*   // Función que valida que se hayan ingresado todos los campos.
  validateFields(product) {
    const arrayProduct = [
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock,
    ];
    const required = arrayProduct.includes(undefined);
    return required;
  }
  // Función que valida que no se repita el campo "code".
  validateCode(product) {
    const validation = this.products.some((el) => el.code === product.code);
    return validation;
  } */
}
