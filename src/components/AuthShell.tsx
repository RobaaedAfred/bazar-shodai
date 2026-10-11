import Link from "next/link";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[420px] px-4 py-10">
      <h1 className="text-center text-2xl font-extrabold">{title}</h1>
      <p className="mt-1 text-center text-sm text-muted">{subtitle}</p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5 shadow-[0_1px_2px_rgba(20,40,25,.05)]">{children}</div>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-brand">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60";
export const primaryBtn =
  "w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60";
