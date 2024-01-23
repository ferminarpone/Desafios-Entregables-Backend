import { Router } from "express";
import userDao from "../dao/dbManager/user.dao.js";
import { validateUser } from "../utils/validateUser.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

// Register
router.post(
  "/register",
  validateUser,
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failregister",
  }),
  async (req, res) => {
    res.send({
      status: "success",
      message: "Usuario creado con exito"
    });
  }
);

router.get("/failregister", (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
});

// Login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    const user = req.user;
    if (!user)
      return res.status(400).send({ error: "Credenciales invalidas." });
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
    };
    user.email === "adminCoder@coder.com"
      ? (req.session.admin = true)
      : (req.session.usuario = true);

    res.send({
      status: "success",
      payload: req.session.user,
      message: "¡Primer logueo realizado!",
    });
  }
);

router.get("/faillogin", (req, res) => {
  res.status(401).send({ error: "Failed to process login!" });
});

//logout
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({
        error: "Error logout",
      });
    }
    res.send("Session cerrada correctamente");
  });
});

export default router;
