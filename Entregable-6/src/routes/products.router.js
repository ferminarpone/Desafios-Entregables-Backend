import { Router } from "express";
import ProductsDao from "../dao/dbManager/products.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit, page, sort, filter } = req.query;
  try {
    const products = await ProductsDao.getAllProducts(
      limit,
      page,
      sort,
      filter
    );
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({
      message: e.message,
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
    res.status(200).json(productId);
  } catch (e) {
    res.status(404).jsonjson({
      error: e,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await ProductsDao.createProduct(newProduct);
    res.status(200).json({
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
    res.status(200).json({
      mensaje: "El producto se actualizo exitosamente.",
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await ProductsDao.deleteProduct(pid);
    res.status(200).json({
      mensaje: "Producto eliminado exitosamente",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

export default router;
