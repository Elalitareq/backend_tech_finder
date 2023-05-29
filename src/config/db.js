import mongoose from 'mongoose';

const connectToDatabase = async () => {
  // MongoDB connection string
  const connectionString = 'mongodb+srv://techfinder:techpassword@cluster0.eni99fw.mongodb.net/techfinderdb?retryWrites=true&w=majority';

  // Set up MongoDB connection
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
  });

  try {
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
