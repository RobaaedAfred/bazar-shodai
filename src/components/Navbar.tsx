import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CATEGORIES } from "@/lib/constants";
import BanglaDate from "./BanglaDate";
import Avatar from "./Avatar";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  const pathname = h.get("x-pathname") ?? "";
  const user = session?.user;

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-xl shadow-sm">🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold">বাজার দর</span>
            <BanglaDate className="block text-[11px] text-muted" />
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold hover:bg-black/5 [&::-webkit-details-marker]:hidden">
                <Avatar user={user} />
                <span className="hidden max-w-[110px] truncate sm:inline">{user.name.split(" ")[0]}</span>
                <svg className="h-3 w-3 text-muted transition group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 7.5 10 12l4.5-4.5z" />
                </svg>
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-line bg-white p-3 shadow-xl">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
                <div className="mt-3 flex flex-col gap-1 text-sm">
                  <Link href="/profile" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5">
                    <span>👤</span> আমার প্রোফাইল
                  </Link>
                  <SignOutButton />
                </div>
              </div>
            </details>
          ) : (
            <>
              <Link href="/signin" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5">
                সাইন ইন
              </Link>
              <Link href="/signup" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="mx-auto max-w-6xl px-4 pb-3" aria-label="ক্যাটাগরি">
        <ul className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {CATEGORIES.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/category/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                    active ? "bg-brand text-white shadow" : "text-ink hover:bg-black/5"
                  }`}
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}