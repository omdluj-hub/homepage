"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin, Calendar, ClipboardCheck } from "lucide-react";

const FloatingBanner = () => {
  const menuItems = [
    { 
      name: "비대면 처방", 
      icon: <ClipboardCheck className="w-8 h-8" />, 
      href: "https://bbs-ruddy-iota.vercel.app/diet",
      bg: "bg-black"
    },
    { 
      name: "054-475-1075", 
      icon: <Phone className="w-8 h-8" />, 
      href: "tel:054-475-1075",
      bg: "bg-[#222222]"
    },
    { 
      name: "카톡 상담", 
      icon: <MessageCircle className="w-8 h-8" />, 
      href: "https://pf.kakao.com/_JEGuu", 
      bg: "bg-[#333333]"
    },
    { 
      name: "이벤트 안내", 
      icon: <Calendar className="w-8 h-8" />, 
      href: "https://event-snowy-ten.vercel.app/", 
      bg: "bg-[#444444]"
    },
    { 
      name: "오시는 길", 
      icon: <MapPin className="w-8 h-8" />, 
      href: "https://naver.me/5N15Owng", 
      bg: "bg-[#555555]"
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-0 items-end">
      {menuItems.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`${item.bg} text-white group flex items-center w-16 hover:w-56 transition-luxury border-b border-white/5 last:border-0 py-5 px-4`}
        >
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            {item.icon}
          </div>
          <span className="ml-6 whitespace-nowrap font-bold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-luxury">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingBanner;
