"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function useRequireSession(callbackURL: string) {
  const router = useRouter();
  const result = authClient.useSession();
  useEffect(() => {
    if (!result.isPending && !result.data) {
      toast.info("এই পাতা দেখতে আগে সাইন ইন করুন।", { toastId: "protected-route" });
      router.replace(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
    }
  }, [result.isPending, result.data, router, callbackURL]);
  return result;
}
