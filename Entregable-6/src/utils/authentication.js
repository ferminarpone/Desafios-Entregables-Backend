
export const authentication = (req, res, next) => {
if(req.session.user){
    return next()
}else{
    return res.status(403).send("Usuario no autorizado para ingresar.")
}
}
