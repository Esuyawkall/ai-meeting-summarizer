'use client';

import { Console, log } from "console";
import Image from "next/image";

import {useState} from 'react';

export default function Home() {
    const [isDark, setIsDark] = useState(() => {
      if(typeof window !== 'undefined'){
      const saved = localStorage.getItem('darkMode');
      if(saved === 'true') {
        document.documentElement.classList.add('dark');
        return false;
      }
      document.documentElement.classList.add('dark');
      return true;
    }
      return true;
    });
  
    const toggleDarkMode = () => {
      const newValue = !isDark;
      setIsDark(newValue);
      localStorage.setItem('darkMode', String(newValue));
      document.documentElement.classList.toggle('dark');
     console.log("done")
    }
  
    return(
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className=" min-h-screen w-50vw flex flex-col items-center justify-between mx-auto py-32 px-16 sm:items-start">
        <menu className="w-full fixed top-2 left-0 right-0 px-4 flex justify-between items-center md:px-20 md:top-5">
          <div className="flex space-x-5 left-0">
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              Home</button>
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              Record Meeting</button>
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
              Upload file</button>
          </div>
          <button className="right-0">
            <Image
              className="light:invert"
              src="/profile.svg"
              alt="profile.js logo"
              width={40}
              height={40}
              priority
            />
          </button>
        </menu>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-s text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Meeting Summarizer and Scheduler
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Automatically summarize meetings, extract tasks, and schedule your next steps with AI.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[180px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Record Meeting
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-white border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4
             dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Summarize
          </a>
        </div>
        <footer className="w-full fixed bottom-2 left-0 right-0 px-4 flex justify-between items-center md:px-20 md:bottom-5"> <a href="https://github.com/esuyawkall" className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4
             dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]">Contact</a>
             <button onClick={toggleDarkMode}>
              <Image
                className="light:invert"
                src="/settings.svg"
                alt="settings.js logo"
                width={40}
                height={10}
                priority
              />
              </button></footer>
      </main>
    </div>
  );
}
