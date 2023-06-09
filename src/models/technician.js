import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: "Company name is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  address: {
    type: String,
    required: "Address is required",
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique:true,
  },
  image: {
    type: String,
  },
  tel:{
    type:String,
  },
  location: {
    lat: {
      type: Number,
      required: "Latitude is required",
    },
    long: {
      type: Number,
      required: "Longitude is required",
    },
  },
  aproved: {
    type: Boolean,
    default: false,
  },
  workEmail: {
    type: String,
  },
  website: {
    type: String,
  },
  social: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  schedule: {
    monday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    tuesday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    wednesday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    thursday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    friday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    saturday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    sunday: {
      status: {
        type: String,
        required: true,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
  },
  services: [
    {
      type: String,
      enum: ["laptops", "tablets", "desktops", "screens"],
    },
  ],
});

const TechnicianModel = mongoose.model("Technician", technicianSchema);

export default TechnicianModel;
