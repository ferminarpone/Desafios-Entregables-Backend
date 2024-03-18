import userServices from "../services/dbManager/dao/user.services.js";
import { passwordService } from "../services/service.js";
import { createHash, isValidPassword } from "../utils.js";

export const resetPasswordController = async (req, res) => {
  const token = req.params.token;
  const { password1, password2 } = req.body;
  try {
    const pswInfo = await passwordService.getPswInfoByToken({ token });

    const now = new Date();
    if (now > pswInfo.expirationTime) {
      req.logger.warning("Expiro el link para modificar la contraseña");
      passwordService.deletePswInfo(pswInfo._id);
      //LINK A MODIFICAR CONTRASEÑA
      // return res.redirect('/api/email/sendEmailToResetPass')
    }
    const email = pswInfo.email;
    const user = await userServices.getUser({ email });

    if (password1 != password2)
      return res
        .status(400)
        .send({ message: "Las contraseñas ingresadas no son iguales." });
    if (isValidPassword(user, password1))
      return res
        .status(400)
        .send({
          message: "Las contraseña nueva, debe ser distinta a la constraseña actual.",
        });
    await userServices.updateUser(user._id, {password: createHash(password1)})
    res.send({message: "Contraseña actualizada correctamente."});
  } catch (error) {
    res.status(500).send(error.message);
  }
};
