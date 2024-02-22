import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Generación del Hash
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Validación del Hash
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

//JSON Web Tokens (JWT)
export const PRIVATE_KEY = "EcommerceSecretKeyJWT";
export const generateJWTToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
};
//authToken
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return res
      .status(401)
      .send({ error: "Usuario no autenticado o error de token" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return res.status(403).send({ error: "Token invalido, no autorizado" });
    req.user = credentials.user;
    next();
  });
};

//PassportCall manejo de errores
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

// Manejor de autorizacion
export const authorization = (role) => {
  return async (req, res, next) => {
    console.log("req")
    console.log(req.user)
    if (!req.user)
      return res
        .status(401)
        .send("Usuario no autorizado: Usuario no encontrado en JWT");
    if (req.user.role !== role) {
      return res
        .status(403)
        .send("Forbidden: El usuario no tiene permisos con este rol.");
    }
    next();
  };
};

export { __dirname };
