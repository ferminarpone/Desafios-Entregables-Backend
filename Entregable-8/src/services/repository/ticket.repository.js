export default class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createTicket = (ticket) => {
      return this.dao.createTicket(ticket);
    };

    getTicket = (email) => {
        return this.dao.getTicket(email);
      };
  }