import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true,
  },
  // Additional fields specific to computers/laptops
  processor: String,
  memory: String,
  storage: String,
  displaySize: String,
  operatingSystem: String,
  // Add more fields as per your requirements
  
  // Timestamps for creation and update
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

export default Product;
