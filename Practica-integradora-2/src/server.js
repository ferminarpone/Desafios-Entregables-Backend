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
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/sessions.router.js";
import usersViewRouter from "./routes/user.views.router.js";


import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from 'cookie-parser'
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import jwtRouter from "./routes/jwt.router.js";


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
const MONGO_URL = `mongodb+srv://tester:${password}@curso-backend.a730fnv.mongodb.net/${db_name}?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Data base connected"))
  .catch((e) => {
    console.log("Data base connection error");
    console.log(e);
  });

// Configuracion de Session
//Trabajando con JWT no necesito session

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),
    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true,
  })
); 

//Configuración de passport
initializePassport();
app.use(passport.initialize());

app.use(passport.session());

//Cookies
//router.use(cookieParser());
app.use(cookieParser("CoderS3cr3tC0d3"));

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
app.use("/api/sessions", sessionRouter); 

//JWT
app.use("/api/jwt", jwtRouter);
app.use('/', usersViewRouter);
//Routes login gitHub
app.use("/github", githubLoginViewRouter);