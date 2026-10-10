import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { bnPrice, unitInfo } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?reason=protected&callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const p = await getProduct(slug);
  if (!p) notFound();

  const unit = unitInfo(p.unit);
  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = rows.length ? Math.min(...rows.map((r) => r.min)) : p.today;
  const maxPrice = rows.length ? Math.max(...rows.map((r) => r.max)) : p.today;
  const avgPrice = rows.length ? Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length) : p.today;
  const minMarket = rows.length ? rows.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const maxMarket = rows.length ? rows.reduce((a, b) => (b.max > a.max ? b : a)) : null;

  const diff = Math.abs(p.today - p.yesterday);
  const trend =
    p.change.dir === "up" ? (
      <>গতকালের তুলনায় আজ দাম <b className="text-ink">বেড়েছে</b> · {bnPrice(diff)} টাকা</>
    ) : p.change.dir === "down" ? (
      <>গতকালের তুলনায় আজ দাম <b className="text-ink">কমেছে</b> · {bnPrice(diff)} টাকা</>
    ) : (
      <>গতকালের তুলনায় আজ দাম <b className="text-ink">অপরিবর্তিত</b></>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="breadcrumb">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-brand">{p.categoryNameBn}</Link>
        <span>›</span>
        <span className="text-ink">{p.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#eef2ec] text-4xl">{p.image}</span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">{p.nameBn}</h1>
            <p className="text-sm text-muted">{unit.full} · {p.categoryNameBn}</p>
            <p className="mt-1 text-sm text-muted">{trend}</p>
          </div>
        </div>
        <div className="rounded-xl bg-[#eef2ec] px-5 py-3 text-center sm:min-w-[130px]">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-3xl font-extrabold">{bnPrice(p.today)}</p>
          <p className="text-xs text-muted">টাকা / {unit.short}</p>
          <div className="mt-1.5"><ChangeBadge change={p.change} /></div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-line bg-card p-5">
        <h2 className="text-lg font-extrabold">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-white/60 p-4">
            <p className="text-xs text-muted">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-extrabold text-down">{bnPrice(minPrice)} <span className="text-sm">টাকা</span></p>
            <p className="text-xs text-muted">{minMarket ? `${minMarket.market}-এ সবচেয়ে কম` : "সবচেয়ে কম দামের বাজার"}</p>
          </div>
          <div className="rounded-xl border border-line bg-white/60 p-4">
            <p className="text-xs text-muted">সর্বাধিক দাম</p>
            <p className="text-2xl font-extrabold text-up">{bnPrice(maxPrice)} <span className="text-sm">টাকা</span></p>
            <p className="text-xs text-muted">{maxMarket ? `${maxMarket.market}-এ সবচেয়ে বেশি` : "সবচেয়ে বেশি দামের বাজার"}</p>
          </div>
          <div className="rounded-xl border border-line bg-white/60 p-4">
            <p className="text-xs text-muted">গড় দাম</p>
            <p className="text-2xl font-extrabold text-brand">{bnPrice(avgPrice)} <span className="text-sm">টাকা</span></p>
            <p className="text-xs text-muted">{unit.full}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-lg font-extrabold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-line bg-white/60">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.market}-${r.division}`} className="border-b border-line last:border-0 odd:bg-black/[0.02]">
                  <td className="px-4 py-3 font-semibold">{r.market}</td>
                  <td className="px-4 py-3 text-muted">{r.division}</td>
                  <td className="px-4 py-3 text-right">{bnPrice(r.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{bnPrice(r.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">{bnPrice(r.avg)} টাকা</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
