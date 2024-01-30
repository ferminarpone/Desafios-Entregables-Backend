import path from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Generación del Hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//Validación del Hash
export const isValidPassword = (user, password)=> bcrypt.compareSync(password, user.password);

export   {__dirname};