import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;