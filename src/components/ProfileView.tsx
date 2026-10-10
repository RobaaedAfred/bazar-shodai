"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { primaryBtn, inputCls } from "./AuthShell";
import Avatar from "./Avatar";
import { useRequireSession } from "./useRequireSession";

export default function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = useRequireSession("/profile");

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) return void toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-extrabold">আমার প্রোফাইল</h1>
      <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {isPending || !session ? (
        <div className="mt-6 space-y-4" role="status" aria-label="লোড হচ্ছে…">
          <div className="h-24 animate-pulse rounded-2xl bg-card" />
          <div className="h-48 animate-pulse rounded-2xl bg-card" />
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5">
            <div className="flex items-center gap-4">
              <Avatar user={session.user} className="h-16 w-16 text-2xl" />
              <div className="min-w-0">
                <p className="truncate text-lg font-bold">{session.user.name}</p>
                <p className="truncate text-sm text-muted">{session.user.email}</p>
              </div>
            </div>
            <button onClick={signOut} className="rounded-lg border border-up px-4 py-2 text-sm font-semibold text-up transition hover:bg-red-50">
              ↩ সাইন আউট
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-card p-5">
            <h2 className="text-lg font-extrabold">তথ্য</h2>
            <label className="mb-1 mt-4 block text-sm text-muted">নাম</label>
            <input readOnly value={session.user.name} className={`${inputCls} cursor-default bg-black/[0.03]`} />
            <Link href="/profile/update" className={`${primaryBtn} mt-3 block text-center`}>
              আপডেট
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

