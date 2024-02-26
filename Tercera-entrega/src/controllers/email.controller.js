import nodemailer from "nodemailer";
import config from "../config/config.js";
import jwt from "jsonwebtoken";



const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});



export const sendEmailController = (req, res) => {
  console.log("req")
  const user = jwt.verify(req.cookies.jwtCookieToken,"EcommerceSecretKeyJWT")
  console.log(user.user.email)

  const mailOptions = {
    from: "Ecommerce - " + config.gmailAccount,
    to: user.user.email,
    subject: "Compra Exitosa!",
    html: `<div><h1> Gracias por realizar su compra ${user.user.name} </h1></div>`,
    attachments: [],
  };

  try {
    let result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).send({ message: "Error", payload: error });
      }
      console.log("Message sent: %s", info.messageId);
      res.send({ message: "Success", payload: info });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: error,
        message: "No se pudo enviar el email desde:" + config.gmailAccount,
      });
  }
};
