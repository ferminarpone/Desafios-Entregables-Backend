import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../utils.js";

const router = Router();
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// Renderización del perfil del usuario, pasar a /products
router.get(
  "/users",
  /* passport.authenticate('jwt', { session: false }) */
  passportCall('jwt'),
  authorization('user'),
  (req, res) => {
    res.render("profile", {
      user: req.user
    });
  }
);

export default router;
