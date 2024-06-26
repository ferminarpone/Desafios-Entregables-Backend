import { Router } from "express";
import { validateCart } from "../utils/validateCart.js";
import { validateProduct } from "../utils/validateProduct.js";
import { validateProdDel } from "../utils/validateProdDel.js";
import * as CartsController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../utils.js";

const router = Router();

router.post("/", CartsController.createCartController);

router.get("/:cid", validateCart, CartsController.getCartByIdController);

router.post(
  "/:cid/product/:pid",
  validateCart,
  validateProduct,
  passportCall("jwt"),
  authorization("User","Premium"),
  CartsController.addProductInCartController
);

router.delete(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  CartsController.deleteProductInCartController
);

router.put("/:cid", validateCart, CartsController.updateCartController);

router.put(
  "/:cid/product/:pid",
  validateCart,
  validateProdDel,
  CartsController.updateQuantityController
);

router.delete(
  "/:cid",
  validateCart,
  CartsController.deleteProductsInCartController
);
//
router.post("/:cid/purchase", CartsController.createPurchaseController);

router.get('/ticket/:tid', CartsController.getTicketController)

router.delete('/delete-ticket/:tid', CartsController.deleteTicketController)
export default router;
