import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
  } catch (err) {
    console.error("Error connectig to mongo DB", err);
    process.exit(1); //1 means fail 0 means success
  }
};
