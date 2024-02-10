import ProductServices from "../services/dbManager/products.services.js";



export const getProductsControllers = async (req, res) => {
    const { limit, page, sort, filter } = req.query;
    try {
      const products = await ProductServices.getAllProducts(
        limit,
        page,
        sort,
        filter
      );
      res.status(200).json({
        products
      });
    } catch (e) {
      res.status(404).json({
        message: e.message,
      });
    }
  };