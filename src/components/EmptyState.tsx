import Link from "next/link";

export default function EmptyState({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-brand">৪০৪</p>
      <h1 className="mt-3 text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 text-muted">{message}</p>
      <Link href="/" className="mt-6 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-brand-dark">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
