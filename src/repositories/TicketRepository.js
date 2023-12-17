import { TicketModel } from "../models/TicketModel.js";
class TicketRepository {
  async getTickets() {
    return await TicketModel.find({}).exec();
  }

  async createTicket(payload) {
    const ticketPayload = {
        ...payload,
        isValidated: false,
      };
    return TicketModel.create(ticketPayload);
  }

  async getTicketById(id) {
    return await TicketModel.findById(id);
  }


  async updateTicket(id) {
    const newTicket = await TicketModel.findOneAndUpdate(
        {
          _id: id,
        },
        {$set: {isValidated : true}}
      );
      return newTicket;
  }
  async getValidatedTicketsByTrainId(trainID) {
    return TicketModel.find({ TrainID: trainID, isValidated: true });
  }



  async deleteTicket(id) {
    await TicketModel.deleteOne({ _id: id });
  }

  async deleteTicketsByTrainId(trainId) {
    return TicketModel.deleteMany({ TrainID: trainId });
  }
  async deleteTicketsByUserId(userID) {
    return TicketModel.deleteMany({ UserID: userID });
  }
}

export default new TicketRepository();
