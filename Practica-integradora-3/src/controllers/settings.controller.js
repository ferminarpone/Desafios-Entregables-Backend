import userServices from "../services/dbManager/dao/user.services.js";
import { passwordService } from "../services/service.js"
import { isValidPassword } from "../utils.js";

export const resetPasswordController = async (req, res) => {
const token  = req.params.token
const { password } = req.body;
try {
const pswInfo =  await passwordService.getPswInfoByToken({token});

const now = new Date();
if(now > pswInfo.expirationTime){
    req.logger.warning("Expiro el link para modificar la contraseña")
    passwordService.deletePswInfo(pswInfo._id);
    //LINK A MODIFICAR CONTRASEÑA
   // return res.redirect('/api/email/sendEmailToResetPass')
}
const email = pswInfo.email;
const user = await userServices.getUser({email});

if(!isValidPassword(user, password)){
    console.log("contraseñas diferentes")
}
console.log("La nueva contraseña no debe conicidir con la actual")

res.send(pswInfo)
} catch (error) {
    res.send(error.message)
}
}