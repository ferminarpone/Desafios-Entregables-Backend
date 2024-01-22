import { Router } from "express";
import { __dirname } from "../utils.js";
import productsDao from "../dao/dbManager/products.dao.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { limit, page, sort, filter } = req.query;
  try {
    const products = await productsDao.getAllProducts(
      limit,
      page,
      sort,
      filter
    );
    const renderProducts = products.payload;
    res.render("home", {
      title: "Productos",
      renderProducts,
      products,
      fileCss: "styles.css",
    });
  } catch (e) {
    console.log(e)
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
