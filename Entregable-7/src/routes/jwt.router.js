import { Router } from "express";
import passport from "passport";
import { validateUser } from "../utils/validateUser.js";
import {
  jwtFailRegisterController,
  jwtRegisterController,
  loginController,
  loginGithubCallbackController,
  loginGithubController,
  logoutController,
} from "../controllers/jwt.controller.js";

const router = Router();

//Register
router.post(
  "/register",
  validateUser,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/jwt/failregister",
  }),
  jwtRegisterController
);

router.get("/failregister", jwtFailRegisterController);

//Login
router.post("/login", loginController);

//Login Github con Jwt
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  loginGithubController
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "github/error",
  }),
  loginGithubCallbackController
);

router.get("/logout", logoutController);

export default router;
