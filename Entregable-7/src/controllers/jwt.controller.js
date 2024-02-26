import UserServices from "../services/dbManager/dao/user.services.js";
import { generateJWTToken, isValidPassword } from "../utils.js";

//Register
export const jwtRegisterController = async (req, res) => {
  res
    .status(201)
    .send({ status: "success", message: "Usuario creado con exito." });
};

export const jwtFailRegisterController = async (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
};

//Login
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.getUser({ email: email });
    if (!user) {
      console.warn("No existe ningun usuario con email: " + email);
      return res.status(204).send({
        error: "Not found",
        message: "No existe ningun usuario con email: " + email,
      });
    }
    if (!isValidPassword(user, password)) {
      console.warn("Credenciales invalidas para el usuario:" + email);
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales invalidas" });
    }
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    const acces_token = generateJWTToken(tokenUser);
    res.cookie("jwtCookieToken", acces_token, {
      maxAge: 60000,
      httpOnly: true,
    });
    res.send({ message: "Login exitoso" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la aplicación." });
  }
};

//Login Github con Jwt
export const loginGithubController = async (req, res) => {};

export const loginGithubCallbackController = async (req, res) => {
  const user = req.user;
  const tokenUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  const access_token = generateJWTToken(tokenUser);
  console.log("Acces token: ");
  console.log(access_token);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 60000,
    httpOnly: true,
  });
  res.redirect("/products");
};

export const logoutController = async (req, res) => {
  res.clearCookie("jwtCookieToken").send("Session cerrada correctamente");
};
