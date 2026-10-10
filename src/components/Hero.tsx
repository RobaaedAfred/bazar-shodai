import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="grid items-center gap-6 rounded-3xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(20,40,25,.05)] md:grid-cols-2 md:p-10">
      <div>
        <BanglaDate className="inline-block rounded-full bg-[#dcefe0] px-3 py-1 text-xs font-semibold text-brand" />
        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex justify-center md:justify-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bazar-hero.png" alt="তাজা বাজারের ঝুড়ি" className="w-full max-w-[320px] md:max-w-[380px]" />
      </div>
    </section>
  );
}
