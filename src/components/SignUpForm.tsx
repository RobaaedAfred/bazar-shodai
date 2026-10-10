"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, isEmail } from "@/lib/auth-errors";
import AuthShell, { inputCls, primaryBtn } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return fail("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (!isEmail(form.email)) return fail("সঠিক ইমেইল ঠিকানা লিখুন।");
    if (form.password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (form.password !== form.confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error: err } = await authClient.signUp.email({ name: form.name.trim(), email: form.email, password: form.password });
    setLoading(false);
    if (err) return fail(authErrorMessage(err, "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন।"));

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">নাম</label>
          <input id="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" value={form.name} onChange={set("name")} className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">ইমেইল</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set("email")} className={inputCls} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">পাসওয়ার্ড</label>
          <input id="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" value={form.password} onChange={set("password")} className={inputCls} />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-semibold">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" value={form.confirm} onChange={set("confirm")} className={inputCls} />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>{loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}</button>
      </form>
      <SocialButtons callbackURL="/" />
      <p className="mt-4 text-center text-sm text-muted">
        অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-brand">সাইন ইন করুন</Link>
      </p>
    </AuthShell>
  );
}
