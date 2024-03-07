import { model, Schema } from "mongoose";

const chapterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user_subject_id: {
    type: Schema.Types.ObjectId,
    ref: "UserSubject",
    required: true,
  },
} as const);

export const Chapter = model("Chapter", chapterSchema);

export interface ChapterAttributes {
  name: string;
  description?: string;
  user_subject_id: string;
  _id: string;
}