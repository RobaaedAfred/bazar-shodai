"use client";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    setTimeout(() => window.location.assign("/"), 700);
  }

  return (
    <button onClick={handleSignOut} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-up hover:bg-red-50">
      <span>↩</span> সাইন আউট
    </button>
  );
}