import { el } from "@faker-js/faker";
import ProductServices from "../services/dbManager/dao/products.services.js";
import { cartService } from "../services/service.js";

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

export const cartViewController = async (req, res) => {
  try {
    const cid = req.user.cart;
    const cart = await cartService.getCartById(cid, "products.productId");
    const newCart = renderCart(cart);
    const totalAmount = newCart.reduce((acc, el) => {
      return acc + el.amount;
    }, 0);

    res.render("cart.hbs", {
      title: "Cart",
      fileCss: "styles.css",
      user: req.user,
      cart: newCart,
      totalAmount,
      idCart: newCart.length !=0 ? newCart[0].idCart : null
    });
  } catch (e) {
    console.log(e);
    res.render("cart", {
      error: e.message,
    });
  }
};

const renderCart = (cart) => {
  let newCart = []
  cart.products.forEach((el) => {
    const product = {
      thumbnail: el.productId.thumbnail,
      description: el.productId.description,
      category: el.productId.category,
      price: el.productId.price,
      code: el.productId.code,
      stock: el.productId.stock,
      quantity: el.quantity,
      amount: el.productId.price * el.quantity,
      idCart: cart._id
    };
    newCart.push(product);
  });
  return newCart;
};
