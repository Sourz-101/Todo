import mongoose from "mongoose";

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database=(* ￣3)(ε￣ *)=Server");
  } catch (error) {
    console.log("Error connecting to MongoDB ᕦ(ò_óˇ)ᕤ: ", error.message);
  }

}

export default connectDB;