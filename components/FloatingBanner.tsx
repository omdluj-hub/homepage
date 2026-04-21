"use client";

import Link from "next/link";
import { Phone, MessageCircle, MapPin, Calendar, ClipboardCheck } from "lucide-react";

const FloatingBanner = () => {
  const menuItems = [
    { 
      name: "비대면 처방", 
      icon: <ClipboardCheck className="w-10 h-10" />, 
      href: "https://bbs-ruddy-iota.vercel.app/diet",
      bg: "bg-primary"
    },
    { 
      name: "054-474-1075", 
      icon: <Phone className="w-10 h-10" />, 
      href: "tel:054-474-1075",
      bg: "bg-gray-700"
    },
    { 
      name: "카톡 플친", 
      icon: <MessageCircle className="w-10 h-10" />, 
      href: "https://pf.kakao.com/_JEGuu", 
      bg: "bg-[#FEE500]",
      textColor: "text-[#3c1e1e]"
    },
    { 
      name: "이벤트", 
      icon: <Calendar className="w-10 h-10" />, 
      href: "https://event-snowy-ten.vercel.app/", 
      bg: "bg-accent"
    },
    { 
      name: "찾아오는 길", 
      icon: <MapPin className="w-10 h-10" />, 
      href: "https://naver.me/5N15Owng", 
      bg: "bg-point-green"
    },
    { 
      name: "인스타그램", 
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      href: "https://www.instagram.com/hoogumi", 
      bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-1 items-end">
      {menuItems.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`${item.bg} ${item.textColor || 'text-white'} group flex items-center w-20 hover:w-64 transition-all duration-300 rounded-l-2xl shadow-lg overflow-hidden py-4 px-5`}
        >
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <span className="ml-6 whitespace-nowrap font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingBanner;
