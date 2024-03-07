import { model, Schema, Document } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
} as const);

export const Subject = model("Subject", subjectSchema);

export interface SubjectAttributes extends Document<"Subject"> {
  name: string;
  description?: string;
  slug?: string;
}
