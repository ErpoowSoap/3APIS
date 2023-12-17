import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  TrainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  isValidated: {
    type: Boolean,
    default: false,
  },
});

export const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
