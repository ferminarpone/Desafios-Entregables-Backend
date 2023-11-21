import { CartManager } from "../classes/carts/CartManager.js";

export const validateCart = (req, res, next) => {
  const { cid } = req.params;
  if (!cid) {
    return res.json({
      erorr: `El cid es requerido `,
    });
  }
  const managerCart = new CartManager("./src/data/Carts.json");
  const carts = managerCart.getCarts();
  const cart = carts.find((el) => el.id === Number(cid));
  if (!cart) {
    return res.json({
      error: `No existe ningun carrito con id: ${cid}`,
    });
  }
  next();
};
