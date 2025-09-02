import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("DataBase Connected"));

  await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
};
