import cartsDao from "../services/dbManager/carts.services.js";
import ProductServices from "../services/dbManager/products.services.js";


export const validateProdDel = async (req, res, next) => {
  const { pid, cid } = req.params;
  if (!pid || pid == null || pid == " ") {
    return res.json({
      erorr: `El pid es requerido `,
    });
  }
  try {
    const product = await ProductServices.getProductById(pid);
    if (!product) {
      return res.json({
        error: `No existe el producto con id ${pid}`,
      });
    }
    const cart = await cartsDao.getCartById(cid);
    const productInCart = cart.products.find((prod) => prod.productId == pid);
    if (productInCart === undefined) {
      return res.json({
        error: `No existe el producto con id ${pid} dentro del carrito con id ${cid}`,
      });
    }
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
  next();
};
