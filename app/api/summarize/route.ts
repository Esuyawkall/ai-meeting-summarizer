import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define the type of items that can come from the AI
type ScheduleItem = string | { date: string; time: string };

type ParsedResult = {
  summary: string;
  actionItems: ScheduleItem[];
  schedule: ScheduleItem[];
};

// Initialize the Groq/OpenAI client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { meetingText } = body as { meetingText?: string };

    if (!meetingText || !meetingText.trim()) {
      return NextResponse.json(
        { error: "Meeting text is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI meeting assistant. Your task is to summarize the meeting text provided. 
Return **strict JSON only** in the following format:

{
  "summary": "",        // a concise summary of the meeting
  "actionItems": [],    // a list of action items the user is responsible for
  "schedule": []        // a list of dates and times when each action item should be completed
}

You are an AI meeting assistant. Your task is to summarize the meeting text provided. Return STRICT JSON in the exact format below:

{
  "summary": "",        // a concise summary of the meeting
  "actionItems": [],    // a list of action items the user is responsible for
  "schedule": []        // a list of dates and times when each action item should be completed
}

Instructions:

1. Summarize the meeting concisely in "summary".

2. Extract all action items that the user is responsible for and list them all in "actionItems".  

3. Provide the corresponding dates and times for each action item in the "schedule" array.  
   - The "schedule" array must have the **same number of items and order as "actionItems"**.  
   - Each item in "schedule" must be a **string**.  

4. If a date or time is unknown, write "TBD" for that item.

5. For vague time references in the meeting text such as "tomorrow", "next week", "next month", "next year", etc., do the following:  
   - Convert them into **exact calendar dates** based on the meeting date.  
   - If a time is mentioned, include it. If no time is mentioned, use "TBD" for the time.  
   - Attach the calculated date/time to the corresponding action item.  
   - Example: if the action item is "Submit report" and the meeting text says "Submit report by next Monday", output:  
     "Submit report (2026-01-05 10:00AM)"  
   - If no specific time is mentioned:  
     "Submit report (given date + TBD)"  

6. Ensure the JSON output is **strictly valid**:  
   - No extra text or explanations outside the JSON.  
   - Only include the keys "summary", "actionItems", and "schedule".  
   - The "actionItems" and "schedule" arrays must correspond one-to-one.  
   - All items in "actionItems" and "schedule" must be **strings**.


Meeting text:
${meetingText}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ supported Groq model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) throw new Error("AI returned empty content");

    // Safely parse the AI response
    let parsed: ParsedResult;
    try {
      parsed = JSON.parse(content) as ParsedResult;
    } catch (err) {
      console.error("Failed to parse AI response:", content);
      throw new Error("AI response not valid JSON");
    }

    // Ensure actionItems and schedule are strings
    const safeActionItems = Array.isArray(parsed.actionItems)
      ? parsed.actionItems.map((item: ScheduleItem) =>
          typeof item === "string" ? item : `${item.date} at ${item.time}`
        )
      : [];

    const safeSchedule = Array.isArray(parsed.schedule)
      ? parsed.schedule.map((item: ScheduleItem) =>
          typeof item === "string" ? item : `${item.date} at ${item.time}`
        )
      : [];

    return NextResponse.json({
      summary: parsed.summary || "",
      actionItems: safeActionItems,
      schedule: safeSchedule,
    });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
