import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/qbdb');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
