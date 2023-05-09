import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'technician', 'admin'],
    default: 'user'
  },
  // Add any additional fields for the user model as needed
});

const User = mongoose.model('User', userSchema);

export default User;