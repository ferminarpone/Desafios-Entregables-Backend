import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { PORT, db_name, password } from "./env.js";
import { initSocketServer } from "./services/socket.js";

const app = express();
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuraciób web socket
initSocketServer(httpServer);

// Configuración mongoose
mongoose
  .connect(`mongodb+srv://tester:${password}@curso-backend.a730fnv.mongodb.net/${db_name}?retryWrites=true&w=majority`)
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
