import mongoose from "mongoose";
import { DB_NAME, ENV_VARIABLES } from "@/conf";

import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${ENV_VARIABLES.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGO DB ERROR:", error);
  }
}

export const db = connectDB();

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
