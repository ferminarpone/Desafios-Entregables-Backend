import { Router } from "express";
import userDao from "../dao/dbManager/user.dao.js";
import { validateUser } from "../utils/validateUser.js";

const router = Router();

// Register
router.post("/register", validateUser, async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };
    const result = await userDao.createUser(user);
    res.send({
      status: "success",
      message: "Usuario creado con extito con ID: " + result.id,
    });
  } catch (e) {
    res.status(401).json({
        error: e.message,
      });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
   try{ 
      const user = await userDao.getUser({ email, password });
      if (!user)
      return res
    .status(401)
    .send({ status: "error", error: "Incorrect credentials" });
     req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
    };
    res.send({
        status: "success",
        payload: req.session.user,
        message: "¡Primer logueo realizado!",
    }); 
 }catch(e){
    res.status(401).json({
        error: e.message,
      });
}
});

export default router;
