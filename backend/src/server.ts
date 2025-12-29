import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Meeting from "./models/meeting.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

app.post("/api/test", async (req, res) => {
  const meeting = await Meeting.create({
    title: "Test Meeting",
    transcript: "This is a test meeting transcript",
  });

  res.json(meeting);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
