"use client";

import Link from "next/link";
import { Instagram, Youtube, Phone, Clock, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-10">
              <span className="text-3xl font-black tracking-tighter text-black">HOO CLINIC</span>
            </Link>
            <div className="space-y-6 text-sm text-gray-500 font-light leading-relaxed">
              <p className="text-gray-900 font-bold underline decoration-point-green/30 decoration-4 underline-offset-4 inline-block">후한의원 구미점</p>
              <p>주소: 경북 구미시 인동가산로 9-3 4층</p>
              <p>대표자: 이언호 | 사업자번호: 147-92-01460</p>
              <p>전화: 054-474-1075</p>
              <p className="pt-4">© 2026 HOO CLINIC GUMI. All Rights Reserved.</p>
            </div>
            <div className="flex gap-6 mt-12">
              <a href="https://www.instagram.com/hoogumi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Navigation</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-600">
                <li><Link href="/clinic/skin/acne" className="hover:text-black transition-colors">피부 클리닉</Link></li>
                <li><Link href="/clinic/diet/medicine" className="hover:text-black transition-colors">다이어트</Link></li>
                <li><Link href="/clinic/traffic/info" className="hover:text-black transition-colors">교통사고</Link></li>
                <li><Link href="/about" className="hover:text-black transition-colors">병원소개</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Support</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-600">
                <li><Link href="/#location" className="hover:text-black transition-colors">찾아오시는 길</Link></li>
                <li><Link href="/admin" className="hover:text-black transition-colors">관리자</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Contact & Hours</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-bold text-[9px]">Reservation</p>
                  <p className="text-2xl font-black tracking-tight text-black">054.474.1075</p>
                </div>
              </div>
              <div className="flex items-start gap-6 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-black">
                  <Clock size={18} />
                </div>
                <div className="text-[13px] font-light text-gray-500 leading-relaxed">
                  <p><span className="font-bold text-gray-900 mr-2">평일</span> 10:30 - 20:30 (점심 13-14시)</p>
                  <p><span className="font-bold text-gray-900 mr-2">토요일</span> 10:00 - 14:00 (점심시간 없음)</p>
                  <p><span className="font-bold text-gray-900 mr-2 italic">휴진</span> 목요일, 일요일, 공휴일</p>
                  <p className="mt-2 text-[11px] text-gray-400">* 입원실은 365일 상시 운영됩니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
