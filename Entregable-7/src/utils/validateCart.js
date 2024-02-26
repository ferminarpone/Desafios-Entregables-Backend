import CartDao from "../services/dbManager/dao/carts.services.js";

export const validateCart = async (req, res, next) => {
  const { cid } = req.params;
  if (!cid || cid == null || cid == " ") {
    return res.json({
      erorr: `El cid es requerido `,
    });
  }
  try{
    const response = await CartDao.getCartById(cid);
    if(!response){
      return res.json({
        error: `No existe el carrito con id ${cid}`
      })
    }
  }catch(e){
    return res.json({
      error: e.message
    });
  }
  next();
};
