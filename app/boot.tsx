"use client";

import { useEffect } from "react";
import { init } from "@/lib/terminal";

// The terminal is a small imperative program over the server-rendered chrome.
export default function Boot() {
  useEffect(() => init(), []);
  return null;
}
