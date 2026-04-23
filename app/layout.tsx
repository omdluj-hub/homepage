import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import FloatingBanner from "@/components/FloatingBanner";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "후한의원 구미점 | 다이어트, 여드름, 입원실",
    template: "%s | 후한의원 구미점"
  },
  description: "구미 여드름, 피부질환, 다이어트 한약, 교통사고 입원실 운영. 1인실 입원실 365일 운영.",
  keywords: ["구미한의원", "구미다이어트", "구미여드름", "구미입원실", "구미교통사고", "후한의원"],
  authors: [{ name: "후한의원 구미점" }],
  creator: "후한의원 구미점",
  metadataBase: new URL('https://homepage-five-chi.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '후한의원 구미점',
    description: '구미 여드름, 다이어트, 365일 입원실 운영',
    url: 'https://homepage-five-chi.vercel.app',
    siteName: '후한의원 구미점',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'w5NQ-WHd-o_hcKnF8bJoc-WAOklZtZcNapkaNAwDm6A',
  },
  other: {
    'naver-site-verification': '9ab099f7c281e87599a3882646292e03c900ff9a',
  },
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
