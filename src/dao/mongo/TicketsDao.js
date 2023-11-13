import ticketModel from "./models/ticket.model.js";

export default class TicketsDao {
  getTickets = (params) => {
    return ticketModel.find(params).lean();
  };
  getTicketById = (params) => {
    return ticketModel.findOne(params).populate("carts.cart");
  };

  createTicket = (ticket) => {
    return ticketModel.create(ticket);
  };

  updateTicket = (id, ticket) => {
    return ticketModel.updateOne({ _id: id }, { $set: ticket });
  };

  deleteTicket = (id) => {
    return ticketModel.deleteOne({ _id: id });
  };
}
