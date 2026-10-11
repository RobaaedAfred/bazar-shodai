import type { Change } from "@/lib/api";
import { bnPct } from "@/lib/format";

export default function ChangeBadge({ change }: { change: Change }) {
  const base = "rounded-md px-2 py-0.5 text-xs font-bold whitespace-nowrap";
  if (change.dir === "up") return <span className={`${base} bg-red-50 text-up`}>▲ {bnPct(change.pct)}%</span>;
  if (change.dir === "down") return <span className={`${base} bg-green-50 text-down`}>▼ {bnPct(change.pct)}%</span>;
  return <span className={`${base} bg-black/5 text-muted`}>— ০.০%</span>;
}
