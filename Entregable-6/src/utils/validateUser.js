import userDao from "../dao/dbManager/user.dao.js";

export const validateUser = async (req, res, next) => {
  const { first_name, last_name, email, age, password } = req.body;
  const arrayUser = [first_name, last_name, email, age, password];
  const required = arrayUser.includes(undefined) || arrayUser.includes("");
  if (required) {
    return res.status(401).json({
        error: "Se debe completar todos los campos requeridos",
      });
  }
  try {
    const exist = await userDao.getUser({email});
    console.log(exist)
    if (exist) {
      return res
        .status(400)
        .send({ status: "error", message: "Usuario ya existe!" });
    }
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
  next();
};
