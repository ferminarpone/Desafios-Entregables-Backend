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
    const product = dataProducts.getProductById(Number(pid));
    const stock = product.stock;
    if (stock > 0) {
      const stock = product.stock - 1;
      console.log(stock);
        dataProducts.updateProduct(Number(pid), { stock: stock });
    } else {
      throw Error(`Stock insuficiente del producto con id ${pid}`);
    }
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
  next();
};
