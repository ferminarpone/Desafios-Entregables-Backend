import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/data/Products.json");
const products = manager.getProducts();
app.get("/products", (req, res) => {
  const { limit } = req.query;
  if (limit) {
    if (limit > products.length) {
      res.send({
        mensaje: `Solo existen ${products.length} productos`,
      });
    } else {
      const limitProducts = [];
      products.map((el, index) => index < limit && limitProducts.push(el));
      res.json(limitProducts);
    }
  } else {
    res.json(products);
  }
});

app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const fetch = products.find((el) => el.id === Number(pid));
  if (fetch) {
    const productId = manager.getProductById(Number(pid));
    return res.json(productId);
  }
  res.json({
    error: `El producto con id: ${pid} no existe `,
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
