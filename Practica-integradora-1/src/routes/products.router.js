import { Router } from "express";
import ProductsDao from "../dao/dbManager/products.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductsDao.getAllProducts();
    const { limit } = req.query;
    if (limit) {
      if (limit > products.length) {
        res.send({
          mensaje: `Solo existen ${products.length} productos`,
          products,
        });
      } else {
        const limited = products.slice(0, limit);
        res.json(limited);
      }
    } else {
      res.json(products);
    }
  } catch (e) {
    res.json({
      e,
    });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productId = await ProductsDao.getProductById(pid);
    if (productId == null) {
      return res.status(404).json({
        error: `El producto con id ${pid} no existe`,
      });
    }
    res.json(productId);
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await ProductsDao.createProduct(newProduct);
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
  const updatedProduct = req.body;
  try {
    const response = await ProductsDao.updateProduct(pid, updatedProduct);
    if (response == null) {
      return res.status(404).json({
        error: `El producto con id ${pid} no existe`,
      });
    }
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
    const response = await ProductsDao.deleteProduct(pid);
    if (response == null) {
      return res.status(404).json({
        error: `El producto con id ${pid} no existe`,
      });
    }
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
