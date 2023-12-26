import { Router } from "express";
import { ProductManager } from "../dao/fsManager/products/ProductManager.js";
import { __dirname } from "../utils.js";
import productsDao from "../dao/dbManager/products.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsDao.getAllProducts();
    res.render("home", {
      title: "Productos",
      products,
      fileCss: "styles.css",
    });
  } catch (e) {
    res.render("home", {
      error: e.message,
    });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts.hbs", {
    title: "Ingresar productos",
    fileCss: "styles.css",
  });
});

router.get("/chat", (req, res) => {
  res.render("chat.hbs", {
    title: "Chat",
    fileCss: "styles.css",
  });
});

export default router;
