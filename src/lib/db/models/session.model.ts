import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
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
  {
    _id: false,
  }
);

export const Session = model("Session", sessionSchema);
