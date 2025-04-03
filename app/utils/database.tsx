import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mikiyagreeeen:HYIuSEv1V6N8bQUL@cluster0.5t8hv.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Suceess: Conneted to MongoDB");
  } catch {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
