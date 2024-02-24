import mongoose from "mongoose";
import { DB_NAME, ENV_VARIABLES } from "../conf";

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

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        unique: true,
        required: true,
      },
      hashed_password: {
        type: String,
        required: true,
      },
    } as const,
    { _id: false }
  )
);

const Session = mongoose.model(
  "Session",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      expires_at: {
        type: Date,
        required: true,
      },
    } as const,
    { _id: false }
  )
);

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

export { User, Session };

// Functions

async function findUserByUsername(username: string) {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      console.log("User found:", user);
      return user;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

async function createNewUser({
  id,
  username,
  hashed_password,
}: {
  id: String;
  username: String;
  hashed_password: String;
}) {
  try {
    const user = await User.create({
      _id: id,
      username: username,
      hashed_password: hashed_password,
    });
    if (user) {
      console.log("User created successfully:", user);
      return user;
    } else {
      console.log("User not created");
      return null;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
export { findUserByUsername, createNewUser };
