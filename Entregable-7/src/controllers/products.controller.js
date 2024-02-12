import ProductServices from "../services/dbManager/products.services.js";

export const getProductsController = async (req, res) => {
  const { limit, page, sort, filter } = req.query;
  try {
    const products = await ProductServices.getAllProducts(
      limit,
      page,
      sort,
      filter
    );
    res.status(200).json({
      products,
    });
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  const { pid } = req.params;
  try {
    const productId = await ProductServices.getProductById(pid);
    if (productId == null) {
      return res.status(404).json({
        error: `El producto con id ${pid} no existe`,
      });
    }
    res.status(200).json(productId);
  } catch (e) {
    res.status(404).json({
      error: e,
    });
  }
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = req.body;
    await ProductServices.createProduct(newProduct);
    res.status(200).json({
      mensaje: "El producto fue agregado con exito",
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  try {
    const response = await ProductServices.updateProduct(pid, updatedProduct);
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
};

export const deleteProductController = async (req, res) => {
  const { pid } = req.params;
  try {
    await ProductServices.deleteProduct(pid);
    res.status(200).json({
      mensaje: "Producto eliminado exitosamente",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};
