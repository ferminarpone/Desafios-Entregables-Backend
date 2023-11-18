import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/data/Products.json");

app.get("/products", (req, res) => {
  const products = manager.getProducts();
  const { limit } = req.query;
  if (limit) {
    if (limit > products.length) {
      res.send({
        mensaje: `Solo existen ${products.length} productos`,
      });
    } else {
      const limited = products.slice(0, limit);
      res.json({
        limited,
      });
    }
  } else {
    res.json(products);
  }
});
console.log(manager.getProductById(Number(20)));
app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const productId = manager.getProductById(Number(pid));
  if (productId === "Not found.") {
    return res.status(404).json({
      error: `El producto con id: ${pid} no existe `,
    });
  }
  res.json(productId);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
