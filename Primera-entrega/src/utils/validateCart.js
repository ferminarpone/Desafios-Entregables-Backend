import { CartManager } from "../classes/carts/CartManager.js";

export const validateCart = (req, res, next) => {
  const { cid } = req.params;
  if (!cid) {
    return res.json({
      erorr: `El cid es requerido `,
    });
  }
  const managerCart = new CartManager("./src/data/Carts.json");
  try{
    managerCart.getCartById(Number(cid));
  }catch(e){
    return res.json({
      error: e.message
    });
  }
  next();
};
