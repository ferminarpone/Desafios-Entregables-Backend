import { chatModel } from "./models/chat.model.js";

class ChatDao {
  async getAllMessages() {
    return await chatModel.find();
  }

  async saveMessage(message) {
   return await chatModel.create(message);
  }
}

export default new ChatDao();
