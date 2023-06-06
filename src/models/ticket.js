import mongoose from 'mongoose';

const { Schema } = mongoose;

const TicketSchema = new Schema({
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'Technician',
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  serviceType: {
    type: String,
    required: true,
  },
  problem: {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ['open', 'processing', 'resolved'],
    default: 'open',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resolved_at: {
    type: Date,
    default: null,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
  }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
