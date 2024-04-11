import { Router } from "express";
import passport from "passport";
import { validateUser } from "../utils/validateUser.js";
import * as userController from "../controllers/users.controller.js";
import { v2 } from "../config/config.js";
import { dataUri, multerUploads } from "../utils.js";

const router = Router();

//Register
router.post("/register", validateUser, userController.jwtRegisterController);

//Login
router.post("/login", userController.loginController);

//Login Github con Jwt
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  userController.loginGithubController
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "github/error",
  }),
  userController.loginGithubCallbackController
);

//Logout
router.get("/logout", userController.logoutController);

// Cambio de Roles
router.post("/premium/:uid", userController.changeRoleController);

//Eliminar usuario
router.delete("/delete/:uid", userController.deleteController);

//Subir archivos
/* router.post(
  "/:uid/documents",
  uploader.single("file"),
  userController.documentsController
); */

router.post("/upload", multerUploads.single("file"), (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return v2.uploader
      .upload(file, {folder: "Ecommerce/Users"})
      .then((result) => {
        const image = result.url;
        return res.status(200).json({
          messge: "Your image has been uploded successfully to cloudinary",

          data: {
            image,
          },
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  }
});

export default router;
