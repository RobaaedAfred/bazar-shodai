import Link from "next/link";
import type { Product } from "@/lib/api";
import { bnPrice, unitInfo } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-line bg-card p-4 shadow-[0_1px_2px_rgba(20,40,25,.05)]  focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef2ec] text-2xl">{p.image}</span>
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-bold leading-snug">{p.nameBn}</h3>
          <p className="text-xs text-muted">{unitInfo(p.unit).full}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">আজকের দাম</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg font-extrabold">
          {bnPrice(p.today)} <span className="text-sm font-semibold">টাকা</span>
        </p>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
