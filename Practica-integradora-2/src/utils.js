import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
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
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '1h'})
}
//authToken
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return res
      .status(401)
      .send({ error: "Usuario no autenticado o error de token" });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
    if(error) return res.status(403).send({error: "Token invalido, no autorizado"});
    req.user = credentials.user;
    next();
  })
};

export { __dirname };
