const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    try {
      let products = fs.readFileSync(path, "utf-8");
      this.products = JSON.parse(products);
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
      return "Not found.\n";
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

//Clase generadora de instancias de productos.
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

//Testing
const testing = async () => {
  const products = new ProductManager("./Products.json");
  console.log("En este punto el gestionador de eventos se encuentra vacio: \n");
  console.log(products.getProducts());
  console.log("\nGeneración de una instancia de la clase Producto. \n");
  const product1 = new Product(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log(
    "Agregando el producto de prueba al gestionador de productos 'ProductManager'.\n"
  );
  const addProduct1 = await products.addProduct(product1);
  console.log(addProduct1);
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }
  console.log("\nGeneración de una nueva instancia de la clase Producto.\n");
  const product2 = new Product(
    "producto prueba 2",
    "Este es un producto de prueba 2",
    200,
    "Sin imagen",
    "abc12354",
    53
  );
  console.log(
    "Agregando el segundo producto de prueba al gestionador de productos 'ProductManager'.\n"
  );
  const addProduct2 = await products.addProduct(product2);
  console.log("\nGeneración de una nueva instancia de la clase Producto.\n");
  const product3 = new Product(
    "producto prueba 3",
    "Este es un producto de prueba 3",
    200,
    "Sin imagen",
    "abc1234",
    4
  );

  console.log(
    "Agregando el tercer producto de prueba al gestionador de productos 'ProductManager'.\n"
  );
  const addProduct3 = await products.addProduct(product3);
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }
  console.log("\nBuscando el producto con id 1.\n");
  console.log(products.getProductById(1));
  console.log("\nBuscando el producto con id 4.\n");
  console.log(products.getProductById(4));
  console.log("\nActualizando el producto con id 2.\n");
  const newProduct2 = new Product(
    "producto actualizado",
    "Este es un producto de prueba actualizado",
    200,
    "Sin imagen",
    "abc1235",
    5
  );
  const updateProduct2 = await products.updateProduct(2, newProduct2);
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }

  console.log("\nBorrando el producto que tiene id = 1.");
  const deleteProduct1 = await products.deleteProduct(1);
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }
};
testing();