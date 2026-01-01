"use client";

import React from "react";
import { geistSans, geistMono } from "@/lib/fonts";

const RootBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <body
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
    </body>
  );
};

export default RootBody;
