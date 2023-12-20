import { chatModel } from "../../models/chat.model.js";

class ChatDao {
  async getAllMessages() {
    await chatModel.find();
  }

  async saveMessage(message) {
    await chatModel.create(message);
  }
}

export default new ChatDao();
