"use client";
import type { SortKey } from "@/lib/sort";

export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span>সাজান</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="cursor-pointer appearance-none rounded-lg border border-line bg-card py-1.5 pl-3 pr-8 text-sm text-ink focus:outline-2 focus:outline-brand"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
