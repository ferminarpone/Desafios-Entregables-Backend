import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 5000;
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/data/Products.json");

app.get("/products", async (req, res) => {
  const products = manager.getProducts();
  res.json(products)
});

app.listen(PORT, () => console.log("Server listening in port 5000"));
 

