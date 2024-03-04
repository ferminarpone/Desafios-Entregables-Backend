import { ticketModel } from "../models/ticket.model.js";

class TicketServices {
  async createTicket(ticket) {
    return await ticketModel.create(ticket);
  }

  async getTicket(email) {
    return await ticketModel.find({ purchaser: email });
  }
}

export default new TicketServices();
