import mongoose from 'mongoose';

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'Technician',
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  resolvedDate: {
    type: Date,
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
