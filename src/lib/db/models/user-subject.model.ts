import { model, Schema } from "mongoose";

const userSubjectSchema = new Schema({
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  subject_id: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
} as const);

export const UserSubject = model("UserSubject", userSubjectSchema);

export interface UserSubjectAttributes {
  user_id: string;
  subject_id: string;
  _id: string;
}