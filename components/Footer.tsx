"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-accent pt-20 pb-10 relative overflow-hidden">
      {/* 배경 텍스처 */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* 상단 골드 라인 */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-line to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        {/* 상단 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 pb-16 border-b border-[rgba(255,255,255,0.07)]">

          {/* 브랜드 */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-1.5 mb-8">
              <span className="text-2xl font-bold tracking-tight text-white uppercase font-serif">
                Hoo Clinic
              </span>
              <span className="text-[9px] font-bold tracking-[0.45em] text-primary uppercase leading-none font-en">
                Gumi
              </span>
            </div>
            <span className="gold-divider mb-8" />
            <p className="text-sm text-[#7a7370] font-light leading-relaxed max-w-xs mb-10">
              우리는 당신의 아름다움이 가장 자연스럽게 빛나는 순간을 위해 끊임없이 연구하고 진심을 다해 진료합니다.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/hoogumi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6a6460] hover:border-primary hover:text-primary transition-all duration-300"
                title="인스타그램"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://blog.naver.com/hoban2011902"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6a6460] hover:border-[#03C75A] hover:text-[#03C75A] transition-all duration-300"
                title="네이버 블로그"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 내비게이션 */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary mb-8 font-en">
              Navigation
            </h4>
            <ul className="space-y-4 text-[13px] text-[#6a6460]">
              <li>
                <Link href="/clinic/skin/acne" className="hover:text-primary transition-colors">
                  피부 클리닉
                </Link>
              </li>
              <li>
                <Link href="/clinic/diet/medicine" className="hover:text-primary transition-colors">
                  다이어트
                </Link>
              </li>
              <li>
                <Link href="/clinic/traffic/info" className="hover:text-primary transition-colors">
                  교통사고 치료
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  병원소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Support */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary mb-8 font-en">
              Quick Support
            </h4>
            <ul className="space-y-4 text-[13px] text-[#6a6460]">
              <li>
                <Link href="/#location" className="hover:text-primary transition-colors">
                  오시는 길
                </Link>
              </li>
              <li>
                <Link
                  href="https://m.booking.naver.com/booking/6/bizes/449323"
                  className="hover:text-primary transition-colors"
                >
                  실시간 예약
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="lg:col-span-4">
            <h4 className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary mb-8 font-en">
              Contact Info
            </h4>
            <div className="space-y-7">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#6a6460] uppercase mb-2 font-en">
                  Representative
                </p>
                <a
                  href="tel:054-474-1075"
                  className="text-2xl font-bold tracking-tight text-white hover:text-primary transition-colors"
                >
                  054.474.1075
                </a>
              </div>
              <div className="space-y-2.5 text-sm text-[#6a6460] font-light">
                <p>
                  <span className="font-bold text-[#a09890] mr-3">평일</span>10:30 – 20:30
                </p>
                <p>
                  <span className="font-bold text-[#a09890] mr-3">토요일</span>10:00 – 14:00
                </p>
                <p className="text-primary">
                  <span className="font-bold italic mr-3">입원실</span>365일 상시 운영
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-[#4a4744] font-light space-y-1.5 md:space-y-0 md:flex md:gap-6">
            <span>상호명: 후한의원 구미점</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span>대표자: 이언호</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span>사업자등록번호: 328-29-00914</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span>주소: 경북 구미시 인동가산로 9-3 노블레스타워 4층</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/for-ai" className="text-[11px] text-[#3a3734] hover:text-primary transition-colors font-en">
              for AI
            </Link>
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative w-7 h-7 opacity-25 group-hover:opacity-60 transition-opacity">
                <Image src="/images/logo.gif" alt="Hoo Clinic Logo" fill className="object-contain" />
              </div>
              <span className="text-[11px] text-[#3a3734] group-hover:text-primary transition-colors font-en">
                © 2026 HOO CLINIC GUMI.
              </span>
            </Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6a6460] hover:border-primary hover:text-primary transition-all duration-300"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
