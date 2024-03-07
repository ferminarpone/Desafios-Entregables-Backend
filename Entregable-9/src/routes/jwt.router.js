import { Router } from "express";
import passport from "passport";
import { validateUser } from "../utils/validateUser.js";
import * as jwtController from "../controllers/jwt.controller.js";

const router = Router();

//Register
router.post(
  "/register",
  validateUser,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/jwt/failregister",
  }),
  jwtController.jwtRegisterController
);

router.get("/failregister", jwtController.jwtFailRegisterController);

//Login
router.post("/login", jwtController.loginController);

//Login Github con Jwt
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  jwtController.loginGithubController
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "github/error",
  }),
  jwtController.loginGithubCallbackController
);

router.get("/logout", jwtController.logoutController);

export default router;
