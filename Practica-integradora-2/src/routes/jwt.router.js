import { Router } from "express";
import { isValidPassword } from "../utils.js";
import { generateJWTToken } from "../utils.js";
import userDao from "../dao/dbManager/user.dao.js";
import passport from "passport";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDao.getUser({ email: email });
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
    res.send({message: "Login exitoso"})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la aplicación." });
  }
});

export default router;
