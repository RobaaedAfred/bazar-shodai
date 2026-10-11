import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";

const noto = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর ",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম, বাজারভিত্তিক তুলনা ও দামের পরিবর্তন এক জায়গায়।",
  applicationName: "বাজার দর",
  keywords: ["বাজার দর", "আজকের দাম", "ঢাকা বাজার", "BazarDor"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={noto.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <body className="flex min-h-screen flex-col antialiased">
          <Providers>
            <Navbar/>
            <Ticker/>
            {children}
            <Footer />
          </Providers>
        </body>
      </body>
    </html>
  );
}
