import dotenv from "dotenv";
import program from "../process.js";

const environment = program.opts().mode;
const test = program.opts().test;

dotenv.config({
  path: 
    test === true ? "./src/config/.env.test" :
    environment === "prod"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});


export default {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  password: process.env.PASSWORD,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWD,
  environment: environment
};
