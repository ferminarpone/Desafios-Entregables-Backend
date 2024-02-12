import ProductServices from "../services/dbManager/products.services.js";

export const productsViewController = async (req, res) => {
  const { limit, page, sort, filter } = req.query;
  try {
    const products = await ProductServices.getAllProducts(
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
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    res.render("home", {
      error: e.message,
    });
  }
};


