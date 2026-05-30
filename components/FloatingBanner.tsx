"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin, Calendar, ClipboardCheck } from "lucide-react";

const FloatingBanner = () => {
  const menuItems = [
    {
      name: "비대면 처방",
      icon: <ClipboardCheck className="w-[18px] h-[18px]" />,
      href: "https://bbs-ruddy-iota.vercel.app/diet",
    },
    {
      name: "054-474-1075",
      icon: <Phone className="w-[18px] h-[18px]" />,
      href: "tel:054-474-1075",
    },
    {
      name: "카톡 상담",
      icon: <MessageCircle className="w-[18px] h-[18px]" />,
      href: "https://pf.kakao.com/_JEGuu",
    },
    {
      name: "이벤트 안내",
      icon: <Calendar className="w-[18px] h-[18px]" />,
      href: "https://event-snowy-ten.vercel.app/",
    },
    {
      name: "오시는 길",
      icon: <MapPin className="w-[18px] h-[18px]" />,
      href: "https://naver.me/5N15Owng",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col items-end">
      {/* 골드 탑 라인 */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#C9A96E]/60 to-transparent pointer-events-none" />

      {menuItems.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="group relative flex items-center w-12 hover:w-52 bg-[#1C1917] border-b border-[rgba(255,255,255,0.05)] last:border-0 py-4 px-3.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* 좌측 골드 포인트 라인 */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* 아이콘 */}
          <div className="flex-shrink-0 text-[#6a6460] group-hover:text-primary transition-colors duration-300">
            {item.icon}
          </div>

          {/* 레이블 */}
          <span className="ml-4 whitespace-nowrap font-bold text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/90 transition-all duration-400 delay-75 font-en">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingBanner;
