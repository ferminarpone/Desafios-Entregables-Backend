import { Router } from "express";
import CartDao from "../dao/dbManager/carts.dao.js";
import { validateCart } from "../utils/validateCart.js";
import { validateProduct } from "../utils/validateProduct.js";

const router = Router();
router.post("/", async (req, res) => {
  const { cart } = req.body;
  try {
    await CartDao.createCart(cart);
    res.json({
      mensaje: "El carrito fue agregado exitosamente.",
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const carrito = await CartDao.getCartById(cid);
    if (carrito == null) {
      return res.json({
        error: `El carrito con id ${cid} no existe`,
      });
    }
    const productsCart = carrito.products;
    if (productsCart.length > 0) {
      res.json({
        productList: productsCart,
      });
    } else {
      res.json({
        productList: "El carrito se encuentra vacio.",
      });
    }
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.post(
  "/:cid/product/:pid",
  validateCart,
  validateProduct,
  async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const response = await CartDao.addProductInCart(cid, pid);
      res.json({
        mensaje: `El producto con id ${pid} fue agregado exitosamente al carrito con id ${cid}`,
      });
    } catch (e) {
      res.json({
        error: e.message,
      });
    }
  }
);

export default router;
