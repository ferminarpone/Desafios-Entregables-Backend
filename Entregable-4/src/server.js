import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import { ProductManager } from "./classes/products/ProductManager.js";
import { Product } from "./classes/products/Product.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
const socketServer = new Server(httpServer);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// Configuración engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
// Seteando motor de plantillas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
// Public
app.use(express.static(`${__dirname}/public`));
// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

//Web Sockets
const manager = new ProductManager(`${__dirname}/data/Products.json`);
const products = manager.getProducts();

socketServer.on("connection", (socketCliente) => {
  socketCliente.on("form_information", async (data) => {
    try {
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
      socketCliente.emit("products_list",  e.message );
    }
  });

  socketCliente.on("product_delete",(data)=>{
    try{
      manager.deleteProduct(data);
      socketCliente.emit("products_list", products);
    }catch(e){
      socketCliente.emit("products_list", { error: e.message });
    }
  });

  socketCliente.emit("products_list", products);
});

