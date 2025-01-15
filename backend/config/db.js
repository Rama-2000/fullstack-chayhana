import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://rahmatullo9984:rahmat_9984@cluster0.twapc.mongodb.net/food-del');
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};