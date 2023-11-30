import { Router } from "express";
import { ProductManager } from "../classes/products/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const manager = new ProductManager(`${__dirname}/data/Products.json`);
router.get("/", (req, res) => {
 try {
      const products = manager.getProducts();
  res.render("home", { 
    title: "Productos",
    products,
    fileCss: "styles.css"
   });
  } catch (e) {
    res.render("home", {
      error: e.message,
    });
  }
});

router.get("/realtimeproducts", (req, res)=>{
  res.render("realtimeproducts", {
    title: "Ingresar productos",
    fileCss: "styles.css"
  });
})

export default router;
