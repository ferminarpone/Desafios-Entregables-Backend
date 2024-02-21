import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProductsController);

router.get("/:pid", getProductByIdController);

router.post("/", createProductController);

router.put("/:pid", updateProductController);

router.delete("/:pid", deleteProductController);

export default router;
