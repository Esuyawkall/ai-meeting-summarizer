
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import RootBody from "./rootBody";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Meeting Summarizer",
  description: "Summarize and schedule events discussed in your meetings powered by AI",
};

export default function RootLayout({ 
  children }: { 
    children: React.ReactNode }) {
  return (
    <html lang="en">
      <RootBody>
        {children}
      </RootBody>
    </html>
  );
}
