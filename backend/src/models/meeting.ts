// src/models/Meeting.ts
import mongoose, { Document, Schema } from "mongoose";

interface Task {
  text: string;
  owner?: string;
  completed?: boolean;
}

export interface MeetingDocument extends Document {
  title: string;
  transcript: string;
  summary?: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

const meetingSchema = new Schema<MeetingDocument>(
  {
    title: { type: String, required: true },
    transcript: { type: String, required: true },
    summary: { type: String, default: "" },
    tasks: [
      {
        text: String,
        owner: String,
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MeetingDocument>("Meeting", meetingSchema);
