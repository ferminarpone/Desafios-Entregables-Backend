import mongoose from "mongoose";
import config from "./config.js";

const MONGO_URL = config.mongo_url;
export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }
  static getInstance() {
    if (this.#instance) {
      console.log("Ya se ha abierto una conexion a MongoDB.");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }
  #connectMongoDB = async () => {
    try {
      await mongoose.connect(MONGO_URL);
      console.log("Data base connected");
    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };
}
