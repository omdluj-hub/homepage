"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Phone, Clock, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-2 mb-10">
                <span className="text-2xl font-bold tracking-tight uppercase">Hoo Clinic</span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase leading-none">Gumi</span>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs mb-10">
              우리는 당신의 아름다움이 가장 자연스럽게 빛나는 순간을 위해 끊임없이 연구하고 진심을 다해 진료합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">Navigation</h4>
            <ul className="space-y-4 text-[13px] font-medium text-gray-600">
              <li><Link href="/clinic/skin/acne" className="hover:text-primary transition-colors">피부 클리닉</Link></li>
              <li><Link href="/clinic/diet/medicine" className="hover:text-primary transition-colors">다이어트</Link></li>
              <li><Link href="/clinic/traffic/info" className="hover:text-primary transition-colors">교통사고 치료</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">병원소개</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">Quick Support</h4>
            <ul className="space-y-4 text-[13px] font-medium text-gray-600">
              <li><Link href="/#location" className="hover:text-primary transition-colors">오시는 길</Link></li>
              <li><Link href="https://m.booking.naver.com/booking/6/bizes/449323" className="hover:text-primary transition-colors">실시간 예약</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8">Contact Info</h4>
            <div className="space-y-8">
              <div className="flex flex-col gap-1">
                 <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Representative</span>
                 <span className="text-2xl font-bold tracking-tight">054.474.1075</span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-500 font-light">
                 <p><span className="font-bold text-black mr-2">평일</span> 10:30 - 20:30</p>
                 <p><span className="font-bold text-black mr-2">토요일</span> 10:00 - 14:00</p>
                 <p className="text-primary"><span className="font-bold mr-2 italic">입원실</span> 365일 상시 운영</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[11px] text-gray-400 font-light space-y-2 md:space-y-0 md:flex md:gap-8">
            <p>상호명: 후한의원 구미점</p>
            <p>대표자: 이언호</p>
            <p>사업자등록번호: 328-29-00914</p>
            <p>주소: 경북 구미시 인동가산로 9-3 노블레스타워 4층</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/for-ai" className="text-[11px] text-gray-300 hover:text-primary transition-colors">
                for AI
              </Link>
              <Link href="/admin" className="flex items-center gap-4 group">
                <div className="relative w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Image src="/images/logo.gif" alt="Hoo Clinic Logo" fill className="object-contain" />
                </div>
                <span className="text-[11px] text-gray-300 group-hover:text-primary transition-colors">
                  © 2026 HOO CLINIC GUMI.
                </span>
              </Link>
            </div>
            <button 
                onClick={scrollToTop}
                className="w-12 h-12 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all rounded-full"
            >
                <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
