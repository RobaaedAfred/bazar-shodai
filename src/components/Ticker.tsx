import { getProducts } from "@/lib/api";
import { bn, bnPct, unitInfo } from "@/lib/format";

export const tickerFallback = <div className="h-10 border-b border-line bg-card" />;

export default async function Ticker() {
  const items = await getProducts().catch(() => []);
  if (!items.length) return tickerFallback;

  return (
    <div className="marquee overflow-hidden border-b border-line bg-card" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track flex">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0" aria-hidden={k === 1}>
            {items.map((p) => {
              const { dir, pct } = p.change;
              return (
                <li key={p.id} className="flex items-center gap-1.5 whitespace-nowrap border-r border-line px-4 py-2 text-[13px]">
                  <span aria-hidden>{p.image}</span>
                  <span className="font-semibold">{p.nameBn}</span>
                  <span className="text-muted">
                    {bn(p.today)} টাকা/{unitInfo(p.unit).short}
                  </span>
                  {dir === "up" && <span className="font-bold text-up">▲ {bnPct(pct)}%</span>}
                  {dir === "down" && <span className="font-bold text-down">▼ {bnPct(pct)}%</span>}
                  {dir === "flat" && <span className="font-bold text-muted">— ০.০%</span>}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
