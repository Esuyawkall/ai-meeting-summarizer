"use client";

import { useState } from "react";
import { summarizeMeetingAPI, SummaryResult } from "@/lib/api";

const Summarizer = () => {
  const [meetingText, setMeetingText] = useState<string>("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = loading || meetingText.trim() === "";

  const handleSummarize = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!meetingText.trim()) {
      setError("Please enter meeting notes first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data: SummaryResult = await summarizeMeetingAPI(meetingText);
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 box-border ">
      {/* FORM CONTAINER */}
      <div className="w-full max-w-full">
        <form onSubmit={handleSummarize}>
          {/* INPUT */}
          <div className="flex flex-col w-full">
            <textarea
              name="input_data"
              id="input_data"
              value={meetingText}
              onChange={(e) => {
                setMeetingText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste meeting notes or transcript here..."
              rows={6}
              className="w-full box-border bg-blue-200 rounded-2xl p-5 text-black dark:bg-green-200 resize-none"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:gap-5 md:gap-20 py-[8vh] text-base font-medium">
            <button
              type="button"
              className="shrink-0 flex h-12 w-full sm:w-[180px] items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background border border-black/8 transition-colors hover:text-white hover:bg-[#383838] dark:border-white/8 dark:hover:bg-[#ccc] dark:hover:text-black"
            >
              Record Meeting
            </button>

            <button
              type="submit"
              disabled={isDisabled}
              className={`shrink-0 flex h-12 w-full sm:w-[158px] items-center justify-center rounded-full px-5 transition-colors ${
                isDisabled
                  ? "bg-black cursor-not-allowed text-white dark:bg-white dark:text-black"
                  : "bg-blue-300 hover:bg-black/80 text-black dark:bg-green-300 dark:hover:bg-white/80"
              }`}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </form>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-2 text-center text-gray-600">
          Processing your meeting...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-center mb-6">{error}</p>
      )}

      {/* RESULT CONTAINER */}
      {result && (
        <div className="w-full max-w-full space-y-6 mt-6 text-black dark:text-white ">
          {/* SUMMARY */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Meeting Summary</h2>
            <p className="max-w-[30vw]">{result.summary}</p>
          </div>

          {/* ACTION ITEMS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Action Items</h2>
            <ul className="list-disc pl-5 space-y-1">
              {result.actionItems.map((item, index) => (
                <li key={index} className="">{item}</li>
              ))}
            </ul>
          </div>

          {/* SCHEDULE */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Schedule</h2>
            <ul className="list-disc pl-5 space-y-1">
              {result.schedule.map((item, index) => (
                <li key={index} className="">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
