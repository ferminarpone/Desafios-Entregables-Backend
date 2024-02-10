import { Router } from "express";
import CartDao from "../services/dbManager/carts.dao.js";
import { validateCart } from "../utils/validateCart.js";
import { validateProduct } from "../utils/validateProduct.js";
import { validateProdDel } from "../utils/validateProdDel.js";

const router = Router();
router.post("/", async (req, res) => {
  const { cart } = req.body;
  try {
    await CartDao.createCart(cart);
    res.status(200).json({
      mensaje: "El carrito fue agregado exitosamente.",
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
});

router.get("/:cid", validateCart, async (req, res) => {
  const { cid } = req.params;
  try {
    const carrito = await CartDao.getCartById(cid, "products.productId");
    const productsCart = carrito.products;
    if (productsCart.length > 0) {
      res.status(200).json({
        productList: productsCart,
      });
    } else {
      res.status(404).json({
        productList: "El carrito se encuentra vacio.",
      });
    }
  } catch (e) {
    res.status(404).json({
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
      res.status(200).json({
        mensaje: `El producto con id ${pid} fue agregado exitosamente al carrito con id ${cid}`,
      });
    } catch (e) {
      res.status(404).json({
        error: e.message,
      });
    }
  }
);

router.delete(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const response = await CartDao.deleteProductInCart(cid, pid);
      res.status(200).json({
        mensaje: `El producto con id ${pid} fue eliminado exitosamente al carrito con id ${cid}`,
        response,
      });
    } catch (e) {
      res.status(404).json({
        error: e.message,
      });
    }
  }
);

router.put("/:cid", validateCart, async (req, res) => {
  const { cid } = req.params;
  const updateProducts = req.body;
  try {
    const response = await CartDao.updateCart(cid, updateProducts);
    res.json({
      mensaje: `El carrito con id ${cid} fue actualizado exitosamente`,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.put(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body;
    try {
      const response = await CartDao.updateQuantity(cid, pid, quantity);
      res.json({
        mensaje: `La cantidad del producto con id ${pid} en el carrito con id ${cid} fue actualizada exitosamente`,
      });
    } catch (e) {
      res.json({
        error: e.message,
      });
    }
  }
);

router.delete("/:cid", validateCart, async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await CartDao.deleteProducts(cid);
    res.json({
      mensaje: `El carrito con id ${cid} ha sido vaciado con exito`,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});
export default router;
