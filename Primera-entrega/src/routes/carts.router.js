import { Router } from "express";
import { CartManager } from "../carts/CartManager.js";
import { Carts } from "../carts/Carts.js";

const router = Router();

const manager = new CartManager("./src/data/Carts.json");

router.post("/", async (req, res) => {
  const { products } = req.body;
  const cart = new Carts(products);
  try {
    await manager.addCart(cart);
    res.json({
      mensaje: "El carrito fue agregado exitosamente."
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  try {
    const carrito = manager.getCartById(Number(cid));
    const productsCart = carrito.products;
    res.json({
      productList: productsCart,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try{
      await manager.addProductCart(Number(cid) , Number(pid));
      res.json({
          mensaje:  `El producto con id ${pid} fue agregado exitosamente al carrito con id ${cid}`
        })
    }catch(e){
        res.json({
            error: e.message
        })
    }
});

export default router;
