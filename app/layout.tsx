import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import FloatingBanner from "@/components/FloatingBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "후한의원 구미점 | 다이어트, 여드름, 입원실",
  description: "구미 여드름, 피부질환, 다이어트 한약, 교통사고 입원실 운영. 1인실 입원실 365일 운영.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingBanner />
        <FloatingButtons />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
      </body>
    </html>
  );
}
