import { ProductManager } from "../dao/fsManager/products/ProductManager.js";
import ProductDao from "../dao/dbManager/products.dao.js";

export const validateProduct = async(req, res, next) => {
  const { pid } = req.params;
  console.log(pid)
  if (!pid || pid == null || pid == " ") {
    return res.json({
      erorr: `El pid es requerido `,
    });
  }

  try {
    const product = await ProductDao.getProductById(pid);
    if(!product){
      return res.json({
        error: `No existe el producto con id ${pid}`
      })
    }
    const stock = product.stock;
    if (stock > 0) {
      const stock = product.stock - 1;
      console.log(stock);
        await ProductDao.updateProduct(pid ,{ stock: stock });
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
