import { Schema, model } from "mongoose";

const collection = "users";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type:  String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: { type:  Number, required: true },
  password: { type:  String, required: true },
});

const userModel = model(collection, userSchema);

export { userModel };
