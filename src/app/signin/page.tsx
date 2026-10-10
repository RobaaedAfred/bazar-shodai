import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-[420px] animate-pulse rounded-2xl bg-card" />}>
      <SignInForm />
    </Suspense>
  );
}
