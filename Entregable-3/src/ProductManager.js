import fs from 'fs'

export class ProductManager {
  constructor(path) {
    this.path = path;
    try {
      let products = fs.readFileSync(path, "utf-8");
      this.products =  JSON.parse(products);
    } catch {
      this.products = [];
    }
  }
  //Función que devuelve todos los productos que se encuentran en el manejador.
  getProducts() {
    return this.products;
  }
  //Función que agrega productos al arreglo de productos inicial.
  async addProduct(product) {
    const fieldsValidation = this.validateFields(product);
    if (fieldsValidation) {
      console.error(
        `Para ingresar un nuevo producto, es necesario completar todos los campos. \n`
      );
      return null;
    }
    const codeValidation = this.validateCode(product);
    if (codeValidation) {
      console.log(
        "El 'code' del producto ingresado, ya existe en el gestionador de Productos.\n"
      );
      return null;
    }
    product.id =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;
    this.products.push(product);
    const save = await this.saveFile(this.products);
    if (save) {
      console.log(
        `El producto con id ${product.id} fue agregado exitosamente.`
      );
      return true;
    }
    console.log("Se genero un error al agregar el producto.");
  }
  //Función que busca los productos por "Id" en la lista de productos.
  getProductById(idProducto) {
    const fetch = this.products.find((el) => el.id === idProducto);
    if (!fetch) {
      return "Not found.";
    } else {
      return fetch;
    }
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
  //Función que actualiza los datos de un producto existente.
  async updateProduct(idProducto, newProduct) {
    const indice = this.products.findIndex(
      (product) => product.id === idProducto
    );
    this.products[indice] = { ...newProduct, id: idProducto };
    const saveUpdate = await this.saveFile(this.products);
    if (saveUpdate) {
      console.log(
        `El producto con id ${idProducto} fue actualizado exitosamente.`
      );
      return true;
    }
    console.log("Se produjo un error al actualizar el producto.");
  }
  //Función que elimina un producto existente en el archivo.
  async deleteProduct(idProducto) {
    const indice = this.products.findIndex(
      (product) => product.id === idProducto
    );
    if (indice === -1) {
      console.log("El producto que desea eliminar, no existe.");
      return null;
    }
    this.products.splice(indice, 1);
    const save = await this.saveFile(this.products);
    if (save) {
      console.log(
        `El producto con id ${idProducto} fue eliminado exitosamente.`
      );
      return true;
    }
    console.log("Se produjo un error al eliminar el producto.");
  }

  // Función que valida que se hayan ingresado todos los campos.
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
  }
}

