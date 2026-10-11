"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { inputCls, primaryBtn } from "./AuthShell";
import { useRequireSession } from "./useRequireSession";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useRequireSession("/profile/update");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return void toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return void toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন।");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-extrabold">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-muted">আপনার নাম পরিবর্তন করুন।</p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5">
        {isPending || !session ? (
          <div className="h-32 animate-pulse rounded-xl bg-[#e8eee6]" role="status" aria-label="লোড হচ্ছে…" />
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold">নাম</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" className={inputCls} />
            </div>
            <button type="submit" disabled={loading} className={primaryBtn}>{loading ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}</button>
            <Link href="/profile" className="block text-center text-sm text-muted hover:text-brand">← প্রোফাইলে ফিরে যান</Link>
          </form>
        )}
      </div>
    </div>
  );
}
