import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import { ProductManager } from "./classes/products/ProductManager.js";
import { Product } from "./classes/products/Product.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const socketServer = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos el engine
app.engine(
  "hbs",
  handlebars.engine({
    // index.hbs
    extname: "hbs",
    // Plantilla principal
    defaultLayout: "main",
  })
);

// Seteamos nuestro motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
// Public
app.use(express.static(`${__dirname}/public`));
// Routes
app.use("/", viewRouter);

//Web Sockets
const manager = new ProductManager(`${__dirname}/data/Products.json`);
const products = manager.getProducts();

socketServer.on("connection", (socketCliente) => {
  console.log("Cliente conectado");

  socketCliente.on("message", (data) => {
    console.log(data);
  });
  socketCliente.on("form_connection", async (data) => {
    try {
      console.log(data);
      const newProduct = new Product(
        data.title,
        data.description,
        data.code,
        data.price,
        data.status,
        data.stock,
        data.category,
        data.thumbnails
      );
      await manager.addProduct(newProduct);
      socketCliente.emit("products_list", products);
    } catch (e) {
      socketCliente.emit("products_list", { error: e.message });
    }
  });
  socketCliente.emit("products_list", products);
});
