class ProductManager {
    constructor() {
      this.products = [];
    }
    getProducts() {
      return this.products;
    }
    //Función que agrega productos al arreglo de productos inicial.
    addProduct(product) {
      const fieldsValidation = this.validateFields(product);
      if (fieldsValidation)
        return console.error(
          `Para ingresar un nuevo producto, es necesario completar todos los campos. \n`
        );
      const codeValidation = this.validateCode(product);
      if (codeValidation) {
        return console.log(
          "El 'code' del producto ingresado, ya existe en el gestionador de Productos.\n"
        );
      } else {
        product.id = this.products.length > 0?  this.products[this.products.length - 1].id + 1 :  1; 
        this.products.push(product);
      }
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
  const products = new ProductManager();
  console.log("En este punto el gestionador de eventos se encuentra vacio:");
  console.log(products.getProducts());
  
  console.log("\nGeneración de una instancia de la clase Producto de prueba. \n");
  const productOne = new Product(
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
  products.addProduct(productOne);
  
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }
  
  console.log(
    "\nGeneración de una nueva instancia de la clase Producto, con los mismos campos del producto uno.\n"
  );
  const productTwo = new Product(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log(
    "Agregando el segundo producto de prueba al gestionador de productos 'ProductManager'.\n"
  );
  products.addProduct(productTwo);
  
  console.log("\nBuscando el producto con id 1.\n");
  console.log( products.getProductById(1));
  console.log("\nBuscando el producto con id 3.\n");
  console.log( products.getProductById(3));
  
  console.log(
    "\nGeneración de una nueva instancia de la clase Producto, con uno de los campos incompleto.\n"
  );
  const productThree = new Product(
    "producto prueba tres",
    "Este es un producto de prueba",
    400,
    "Sin imagen",
    "abc124"
  );
  console.log(
    "Agregando el tercer producto de prueba al gestionador de productos 'ProductManager'.\n"
  );
  products.addProduct(productThree);
  if (products.getProducts() == "") {
    console.log("El gestionador se encuentra vacio.");
  } else {
    console.log("Los productos gestionados son: \n");
    console.log(products.getProducts());
  }