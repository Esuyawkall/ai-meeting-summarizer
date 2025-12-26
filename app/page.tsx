'use client';

import Image from "next/image";

import { useEffect, useState } from "react";


export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

    const toggleDarkMode = () => {
      const newValue = !isDark;
      setIsDark(newValue);
      localStorage.setItem('darkMode', String(newValue));
      if (newValue) {
        document.documentElement.classList.add("dark");
        
      } 
      else {
        document.documentElement.classList.remove("dark");
      }     
      console.log("done")
    }
  
    return(
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className=" min-h-screen w-50vw flex flex-col items-center justify-between mx-auto py-32 px-16 sm:items-start">
        <menu className="w-full fixed top-2 left-0 right-0 px-4 flex justify-between items-center md:px-20 md:top-5">
          <div className="flex space-x-5 left-0">
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors border border-black/8 hover:text-white  hover:bg-[#383838] 
            dark:border-white/8 dark:hover:text-black dark:hover:bg-[#ccc]">
              Home</button>
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors border border-black/8 hover:text-white  hover:bg-[#383838] 
            dark:border-white/8 dark:hover:text-black dark:hover:bg-[#ccc]">
              Record Meeting</button>
            <button className="p-2 px-5 rounded-md bg-foreground text-background transition-colors border border-black/8 hover:text-white  hover:bg-[#383838] 
            dark:border-white/8 dark:hover:text-black dark:hover:bg-[#ccc]">
              Upload file</button>
          </div>
          <button className="right-0">
            <Image
            id="profile"
              className=""
              src={isDark ? "/profile_white.svg" : "/profile.svg"}
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
        <div className="flex flex-col md:gap-20 text-base font-medium sm:flex-row sm:gap-5 py-[8vh] mx-auto">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background border border-black/8 transition-colors hover:text-white hover:bg-[#383838] dark:border-white/8 dark:hover:bg-[#ccc] dark:hover:text-black md:w-[180px]"
            href="!"
            target="_blank"
            rel="noopener noreferrer"
          >
            Record Meeting
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-black border border-solid border-black/8 px-5 transition-colors hover:bg-black/4 hover:text-black hover:border-black/8
            dark:hover:bg-[#1a1a1a] md:w-[158px] dark:bg-white dark:hover:text-white"
            href="!"
            target="_blank"
            rel="noopener noreferrer"
          >
            Summarize
          </a>
        </div>
        <footer className="w-full fixed bottom-2 left-0 right-0 px-4 flex justify-between items-center md:px-20 md:bottom-5"> 
          <a href="https://github.com/esuyawkall" className="flex h-12 items-center justify-center rounded-full border border-solid bg-foreground text-background 
          border-black/8 px-5 transition-colors hover:text-white hover:bg-[#383838] dark:border-white/8 dark:hover:bg-[#ccc] dark:hover:text-black md:w-[158px]">
            Contact</a>
             <button onClick={toggleDarkMode}>
              <Image
              id="settings"
                className=""
                src={isDark ? "/settings_white.svg" : "/settings.svg"}
                alt="settings.js logo"
                width={40}
                height={40}
                priority
              />
              </button></footer>
      </main>
    </div>
  );
}
