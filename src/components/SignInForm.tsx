"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, isEmail, safeCallback } from "@/lib/auth-errors";
import AuthShell, { inputCls, primaryBtn } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callback = safeCallback(params.get("callbackURL"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.info("এই পাতা দেখতে আগে সাইন ইন করুন।", { toastId: "protected-route" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!isEmail(email)) return fail("সঠিক ইমেইল ঠিকানা লিখুন।");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");

    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (err) return fail(authErrorMessage(err, "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।"));

    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    router.push(callback);
    router.refresh();
  }

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">ইমেইল</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</label>
          <input id="password" type="password" autoComplete="current-password" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>{loading ? "অপেক্ষা করুন…" : "সাইন ইন"}</button>
      </form>
      <SocialButtons callbackURL="/" />
      <p className="mt-4 text-center text-sm text-muted">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-brand">সাইন আপ করুন</Link>
      </p>
    </AuthShell>
  );
}
