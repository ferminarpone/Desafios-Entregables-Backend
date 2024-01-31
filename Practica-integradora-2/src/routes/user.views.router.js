import { Router } from "express";
import passport from "passport";

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
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.render("profile", {
      user: req.user
    });
  }
);

export default router;
