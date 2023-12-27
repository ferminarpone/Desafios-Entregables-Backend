import cartsDao from "../dao/dbManager/carts.dao.js";
import ProductDao from "../dao/dbManager/products.dao.js";

export const validateProdDel = async(req, res, next) => {
  const { pid, cid } = req.params;
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
    const cart = await cartsDao.getCartById(cid);
    const productInCart = cart.products.find((prod)=> prod.productId == pid);
    console.log(productInCart)
    if(productInCart === undefined){
      return res.json({
        error: `No existe el producto con id ${pid} dentro del carrito con id ${cid}`
      })
    }
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
  next();
};
