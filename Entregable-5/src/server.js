import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { ProductManager } from "./dao/classes/products/ProductManager.js";
import { Product } from "./dao/classes/products/Product.js";
import { PORT, db_name } from "./env.js";
import productsDao from "./dao/dbManager/products.dao.js";

const app = express();
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuraciób web socket
const socketServer = new Server(httpServer);

// Configuración mongoose
mongoose
  .connect(`mongodb://localhost:27017/${db_name}`)
  .then(() => console.log("Data base connected"))
  .catch((e) => {
    console.log("Data base connection error");
    console.log(e);
  });

// Configuración engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
// Seteando motor de plantillas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
// Public
app.use(express.static(`${__dirname}/../public`));
// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Web Sockets

socketServer.on("connection", async (socketCliente) => {
  socketCliente.on("form_information", async (data) => {
    try {
      await productsDao.createProduct(data);
      const prod = await productsDao.getAllProducts();
      socketCliente.emit("products_list", prod);
    } catch (e) {
      if (e.message.includes("required")) {
        return socketCliente.emit(
          "products_list",
          "Para agregar un nuevo producto, es necesario ingresar todos los campos requeridos."
        );
      }
      socketCliente.emit("products_list", e.message);
    }
  });

  socketCliente.on("product_delete", async(data) => {
    try {
      await productsDao.deleteProduct(data);
      const prod = await productsDao.getAllProducts();
      socketCliente.emit("products_list", prod);
    } catch (e) {
      socketCliente.emit("products_list", { error: e.message });
    }
  });
  const prod = await productsDao.getAllProducts();
  socketCliente.emit("products_list", prod);
});
