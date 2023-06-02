import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    required: "First name is required",
    type: String,
  },
  lastName: {
    required: "Last name is required",
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    required: "Email address is required",
    type: String,
    unique: true,
    validate: {
      // Regular expression to validate email addresses
      validator: (value) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: "Password is required",
  },
  image: {
    type: String,
  },
  role: {
    default: "user",
    type: String,
    enum: ["admin", "user", "technician"],
  },
});

export const UserModel = mongoose.model("User", UserSchema);
