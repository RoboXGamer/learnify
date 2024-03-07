import { User } from "@/lib/db/models/user.model";

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

export { createNewUser, findUserByUsername };
