import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.routes.js";

const app = express();
const PORT = 8080;

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));


app.use("/", viewRouter);




/* app.use(express.json());
app.use(express.urlencoded({ extended: true })); */

/* app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido.",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter); */

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
