"use client";
import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div className="loader">Loading...</div>{" "}
      {/* Replace this with your actual loader */}
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    </div>
  );
}
