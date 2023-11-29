import { ProductManager } from "../classes/products/ProductManager.js";

export const validateProduct = (req, res, next) => {
  const { pid } = req.params;
  if (!pid) {
    return res.json({
      erorr: `El pid es requerido `,
    });
  }
  const dataProducts = new ProductManager("./src/data/Products.json");
  try {
    dataProducts.getProductById(Number(pid));
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
  next();
};
