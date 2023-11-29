import { Router } from "express";
import { ProductManager } from "../classes/products/ProductManager.js";
import { Product } from "../classes/products/Product.js";

const router = Router();

const manager = new ProductManager("./src/data/Products.json");

router.get("/", (req, res) => {
  const products = manager.getProducts();
  const { limit } = req.query;
  if (limit) {
    if (limit > products.length) {
      res.send({
        mensaje: `Solo existen ${products.length} productos`,
      });
    } else {
      const limited = products.slice(0, limit);
      res.json(limited);
    }
  } else {
    res.json(products);
  }
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const productId = manager.getProductById(Number(pid));
  if (productId === undefined) {
    return res.status(404).json({
      error: `El producto con id: ${pid} no existe `,
    });
  }
  res.json(productId);
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const newProduct = new Product(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  try {
    await manager.addProduct(newProduct);
    res.json({
      mensaje: "El producto fue agregado con exito",
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;

  const newProduct = new Product(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  );
  try {
    await manager.updateProduct(Number(pid), newProduct);
    res.json({
      mensaje: "El producto se actualizo exitosamente.",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await manager.deleteProduct(Number(pid));
    res.json({
      mensaje: "Producto eliminado exitosamente",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

export default router;
