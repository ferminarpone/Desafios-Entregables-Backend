import { Schema, model } from "mongoose";

const passwordSchema = new Schema({
  token: { type: String },
  email: { type: String },
  expirationTime: { type: Number },
  password: { type: String },
});

const passwordModel = model("Passwords", passwordSchema);

export { passwordModel };
