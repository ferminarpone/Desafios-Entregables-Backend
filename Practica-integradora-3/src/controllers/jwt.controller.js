import UserServices from "../services/dbManager/dao/user.services.js";
import UsersDto from "../services/dto/users.dto.js";
import { generateJWTToken, isValidPassword } from "../utils.js";

//Register
export const jwtRegisterController = async (req, res) => {
  const { email } = req.body;
  try{
  const exist = await UserServices.getUser({ email: email });
  if (exist){
    req.logger.warning("El usuario que intentar loggear ya existe")
    res.status(409).send({error: "User already exist"})
  }else{
    res
      .status(201)
      .send({ status: "success", message: "Usuario creado con exito." });
  }
  }catch(error){
    res.status(401).send({ error: "Failed to process register!" });
  }
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
      req.logger.warning("No existe ningun usuario con email: " + email);
      return res.status(404).send({
        error: "Not found",
        message: "No existe ningun usuario con email: " + email,
      });
    }
    if (!isValidPassword(user, password)) {
      req.logger.warning("Credenciales invalidas para el usuario:" + email);
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales invalidas" });
    }
    const tokenUser = new UsersDto(user);
    const acces_token = generateJWTToken(tokenUser);
    res.cookie("jwtCookieToken", acces_token, {
      maxAge: 360000,
      httpOnly: true,
    });
    res
      .status(200)
      .json({ message: "Login exitoso", role: `${tokenUser.role}` });
  } catch (error) {
    req.logger.error(error.message);
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la aplicación." });
  }
};

//Login Github con Jwt
export const loginGithubController = async (req, res) => {};

export const loginGithubCallbackController = async (req, res) => {
  const user = req.user;
  const tokenUser = new UsersDto(user);
  const access_token = generateJWTToken(tokenUser);
  req.logger.info("Acces token: ");
  req.logger.info(access_token);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 60000,
    httpOnly: true,
  });
  res.redirect("/products");
};

export const logoutController = async (req, res) => {
  res.clearCookie("jwtCookieToken").send("Session cerrada correctamente");
};
