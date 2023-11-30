import { Router } from "express";

const router = Router();

/* router.get("/", (req, res) => {
  const productos = { user: "Fermin" };
  res.render("home", {
    user: productos.user,
  });
}); */
router.get("/", (req, res) => {
    res.render("home", {
      title: "Titulo nuevo nuevo",
      name: "Eric",
      fileCss: "styles.css",
    });
  });
  
export default router;
