import { Router } from "express";
import passport from "passport";
import { validateUser } from "../utils/validateUser.js";
import * as jwtController from "../controllers/users.controller.js";

const router = Router();

//Register
router.post(
  "/register",
  validateUser,
  jwtController.jwtRegisterController
);

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
