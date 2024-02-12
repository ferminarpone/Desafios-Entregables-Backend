import CartServices from "../services/dbManager/carts.services.js";

export const createCartController = async (req, res) => {
  const { cart } = req.body;
  try {
    await CartServices.createCart(cart);
    res.status(200).json({
      mensaje: "El carrito fue agregado exitosamente.",
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

export const getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  try {
    const carrito = await CartServices.getCartById(cid, "products.productId");
    const productsCart = carrito.products;
    if (productsCart.length > 0) {
      res.status(200).json({
        productList: productsCart,
      });
    } else {
      res.status(404).json({
        productList: "El carrito se encuentra vacio.",
      });
    }
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

export const addProductInCartController = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const response = await CartServices.addProductInCart(cid, pid);
    res.status(200).json({
      mensaje: `El producto con id ${pid} fue agregado exitosamente al carrito con id ${cid}`,
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

export const deleteProductInCartController = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const response = await CartServices.deleteProductInCart(cid, pid);
    res.status(200).json({
      mensaje: `El producto con id ${pid} fue eliminado exitosamente al carrito con id ${cid}`,
      response,
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};

export const updateCartController = async (req, res) => {
  const { cid } = req.params;
  const updateProducts = req.body;
  try {
    const response = await CartServices.updateCart(cid, updateProducts);
    res.json({
      mensaje: `El carrito con id ${cid} fue actualizado exitosamente`,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};

export const updateQuantityController = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body;
  try {
    const response = await CartServices.updateQuantity(cid, pid, quantity);
    res.json({
      mensaje: `La cantidad del producto con id ${pid} en el carrito con id ${cid} fue actualizada exitosamente`,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};

export const deleteProductsInCartController = async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await CartServices.deleteProducts(cid);
    res.json({
      mensaje: `El carrito con id ${cid} ha sido vaciado con exito`,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};
