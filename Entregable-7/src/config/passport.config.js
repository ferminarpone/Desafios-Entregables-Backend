import passport from "passport";
import passportLocal from "passport-local";
import userDao from "../dao/dbManager/user.dao.js";
import { createHash, isValidPassword } from "../utils.js";

//Declaración de estrategia

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  //Register
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const exist = await userDao.getUser({ email: username });
          if (exist) {
            console.log("El usuario ya existe");
            return done(null, false);
          } 
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const newUser = await userDao.createUser(user);
          return done(null, newUser);
        } catch (error) {
            return done("Error registrando al usuario " + error);
        }
      }
    )
  );

  //Login
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userDao.getUser({ email: username });
          if (!user) {
            console.warn("No existe ningun usuario con email: " + username);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.warn("Credenciales invalidas para el usuario: " + username);
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  //Serialización y Deserialización
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userDao.getUserById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
};

export default initializePassport;
