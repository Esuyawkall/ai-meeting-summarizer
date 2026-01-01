"use client"; // if you’re using App Router and this is imported in a client component

export type SummaryResult = {
  summary: string;
  actionItems: string[];
  schedule: string[];
};

export const summarizeMeetingAPI = async (
  text: string
): Promise<SummaryResult> => {
  if (!text.trim()) {
    throw new Error("Meeting text is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/summarize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error || "Failed to summarize meeting");
  }

  const data: SummaryResult = await response.json();
  return data;
};
