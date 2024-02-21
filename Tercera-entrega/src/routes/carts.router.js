import { Router } from "express";
import { validateCart } from "../utils/validateCart.js";
import { validateProduct } from "../utils/validateProduct.js";
import { validateProdDel } from "../utils/validateProdDel.js";
import {
  addProductInCartController,
  createCartController,
  deleteProductInCartController,
  deleteProductsInCartController,
  getCartByIdController,
  updateCartController,
  updateQuantityController,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCartController);

router.get("/:cid", validateCart, getCartByIdController);

router.post(
  "/:cid/product/:pid",
  validateCart,
  validateProduct,
  addProductInCartController
);

router.delete(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  deleteProductInCartController
);

router.put("/:cid", validateCart, updateCartController);

router.put(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  updateQuantityController
);

router.delete("/:cid", validateCart, deleteProductsInCartController);

export default router;
