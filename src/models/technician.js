import mongoose from "mongoose";

const { Schema } = mongoose;

const technicianSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: {type: String,required: true,},
  email: {type: String,required: true,unique: true,},
  contactNumber: {type: String,required: true,},
  address: {street: String,city: String,state: String,postalCode: String,},
  location: {
    type: {type: String,enum: ["Point"],required: true,},
    coordinates: {type: [Number],required: true,},
  },
  skills: [String],
  description: String,
  ratings: {average: Number,total: Number,},
  availability: {
    monday: {    startTime: String,endTime: String,},
    tuesday: {startTime: String,endTime: String,},
    wednesday: {startTime: String,endTime: String,},
    thursday: {startTime: String,endTime: String,},
    friday: {startTime: String,endTime: String,},
    saturday: {startTime: String,endTime: String,},
    sunday: {startTime: String,endTime: String,},
  },
  services: [String],
  socialMedia: [
    {
      name: {type: String,required: true,},
      url: {type: String,required: true,},
    },
  ],
});

// Create geospatial index on the location.coordinates field
technicianSchema.index({ "location.coordinates": "2dsphere" });

const Technician = mongoose.model("Technician", technicianSchema);

export default Technician;
