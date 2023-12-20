import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, requiered: true },
});

const chatModel = model("Messages", chatSchema);

export { chatModel };
