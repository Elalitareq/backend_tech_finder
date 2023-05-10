import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['Open', 'Assigned', 'In Progress', 'Resolved'],
    default: 'Open',
  },
  assignedTechnician: {
    type: Schema.Types.ObjectId,
    ref: 'Technician',
  },
  assignedDate: {
    type: Date,
  },
  resolvedDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index on the location.coordinates field
ticketSchema.index({ 'location.coordinates': '2dsphere' });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
