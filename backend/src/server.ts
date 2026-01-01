import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

type SummarizeRequestBody = {
  text?: string;
};

type SummarizeResponse = {
  summary: string;
  actionItems: string[];
  schedule: string[];
};

type EmptyParams = Record<string, never>;

app.post(
  "/api/summarize",
  (
    req: Request<EmptyParams, SummarizeResponse | { error: string }, SummarizeRequestBody>,
    res: Response<SummarizeResponse | { error: string }>
  ) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Meeting text is required"
      });
    }

    return res.json({
      summary:
        "The meeting focused on current project progress, upcoming deadlines, and clarifying team responsibilities.",
      actionItems: [
        "Finalize project requirements document",
        "Share updated timeline with the team",
        "Prepare questions for the client review"
      ],
      schedule: [
        "Internal team check-in on Wednesday",
        "Client review meeting next week"
      ]
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
