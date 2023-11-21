import { ProductManager } from "../classes/products/ProductManager.js";

export const validateProduct = (req, res, next) => {
  const { pid } = req.params;
  if (!pid) {
    return res.json({
      erorr: `El pid es requerido `,
    });
  }
  const dataProducts = new ProductManager("./src/data/Products.json");
  const products = dataProducts.getProducts();
  const fetchProduct = products.find((el) => el.id === Number(pid));
  if (!fetchProduct) {
    return res.json({
      error: `No existe ningun producto con id: ${pid}`,
    });
  }
  next();
};
