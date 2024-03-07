import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { initSocketServer } from "./socket/socket.js";
import usersViewRouter from "./routes/user.views.router.js";
import emailRouter from "./routes/email.router.js";
import mockingRouter from "./routes/mocking.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import jwtRouter from "./routes/jwt.router.js";
import config from "./config/config.js";
import program from "./process.js";
import MongoSingleton from "./config/mongoDb-singleton.js";
import { addLogger, logger } from "./config/logger-custom.js";


const PORT = program.opts().p === 8080 ? config.port : program.opts().p;

const app = express();
const httpServer = app.listen(PORT, () =>
  logger.info(`Server listening on port ${PORT}`)
);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger)

// Configuraciób web socket
initSocketServer(httpServer);

// Configuracion MongoSingleton
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    logger.error(error.message)
  }
};
mongoInstance();

//Configuración de passport
initializePassport();
app.use(passport.initialize());

//Cookies
app.use(cookieParser("EcommerceS3cr3tC0d3"));

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

// Routes de productos y carritos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", viewsRouter);

//Routes de usuarios
//JWT
app.use("/api/jwt", jwtRouter);
app.use("/", usersViewRouter);
//Routes login gitHub
app.use("/github", githubLoginViewRouter);

//Routes de mailing
app.use("/api/email", emailRouter);

//Route Mocking
app.use('/mockingproducts', mockingRouter);

// Logger Test
app.get('/loggerTest', (req, res)=> {
  req.logger.fatal("Prueba de log level fatal --> en Endpoint"); 
  req.logger.error("Prueba de log level error --> en Endpoint"); 
  req.logger.warning("Prueba de log level warning --> en Endpoint"); 
  req.logger.info("Prueba de log level info --> en Endpoint"); 
  req.logger.http("Prueba de log level http --> en Endpoint"); 
  req.logger.debug("Prueba de log level debug --> en Endpoint"); 

  res.send("Prueba de logger!");
})