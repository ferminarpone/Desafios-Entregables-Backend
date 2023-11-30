import { Router } from "express";
import { ProductManager } from "../classes/products/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const manager = new ProductManager(`${__dirname}/data/Products.json`);
router.get("/", (req, res) => {
  const products = manager.getProducts();
  res.render("home", { products });
  /*   try {
  } catch (e) {
    res.render("home", {
      error: e.message,
    });
  } */
});

export default router;
