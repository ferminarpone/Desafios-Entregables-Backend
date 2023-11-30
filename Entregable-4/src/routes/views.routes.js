import { Router } from "express";
import { ProductManager } from "../classes/products/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const manager = new ProductManager(`${__dirname}/data/Products.json`);
router.get("/", (req, res) => {
 try {
      const products = manager.getProducts();
  res.render("home", { products });
  } catch (e) {
    console.log(e.message)
    res.status(404).render("home", {
      error: e.message,
    });
  }
});

router.get("/realtimeproducts", (req, res)=>{
  res.render("realtimeproducts", {});
})

export default router;
