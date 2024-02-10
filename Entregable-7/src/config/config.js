import dotenv from  'dotenv';
import program from '../process.js';

const environment = program.opts().mode;

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    password: process.env.PASSWORD,
}