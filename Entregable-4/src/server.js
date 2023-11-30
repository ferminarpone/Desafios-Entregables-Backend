import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido.",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
