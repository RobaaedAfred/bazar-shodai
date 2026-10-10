"use client";
import { useEffect, useState } from "react";

export default function BanglaDate({ className }: { className?: string }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD-u-nu-beng", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }),
    );
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {date || "\u00A0"}
    </span>
  );
}
