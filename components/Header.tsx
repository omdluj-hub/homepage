"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ExternalLink, Menu, X, ChevronDown, Search } from "lucide-react";

interface MenuItem {
  name: string;
  engName: string;
  href: string;
  subMenus: { name: string; href: string }[];
  isExternal?: boolean;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openPbtiPopup = () => {
    const width = 500;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      "https://pbti-iota.vercel.app/",
      "pbti_popup",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { 
      name: "피부 클리닉", 
      engName: "Skin & Aesthetic",
      href: "/clinic/skin/acne",
      subMenus: [
        { name: "여드름", href: "/clinic/skin/acne" },
        { name: "여드름흉터", href: "/clinic/skin/scar" },
        { name: "여드름자국", href: "/clinic/skin/mark" },
        { name: "사마귀", href: "/clinic/skin/wart" },
        { name: "지루성/주사피부염", href: "/clinic/skin/seborrheic" },
        { name: "안면홍조", href: "/clinic/skin/rosacea" },
        { name: "리프팅", href: "/clinic/beauty/lifting" },
        { name: "윤곽약침", href: "/clinic/beauty/contour" },
        { name: "스킨부스터", href: "/clinic/beauty/skin-booster" },
      ]
    },
    { 
      name: "다이어트", 
      engName: "Weight Loss",
      href: "/clinic/diet/medicine",
      subMenus: [
        { name: "다이어트 한약", href: "/clinic/diet/medicine" },
        { name: "다이어트 관리", href: "/clinic/diet/program" },
        { name: "비만약침", href: "/clinic/diet/point" },
        { name: "비대면 상담", href: "/clinic/diet/remote" },
      ]
    },
    { 
      name: "교통사고", 
      engName: "Accident",
      href: "/clinic/traffic/info",
      subMenus: [
        { name: "접수 및 절차", href: "/clinic/traffic/info" },
        { name: "교통사고 치료", href: "/clinic/traffic/treatment" },
        { name: "추나요법", href: "/clinic/traffic/chuna" },
        { name: "프리미엄 입원실", href: "/clinic/traffic/room" },
      ]
    },
    { 
      name: "이벤트", 
      engName: "Promotion",
      href: "https://event-snowy-ten.vercel.app/", 
      subMenus: [],
      isExternal: true
    },
    { 
      name: "병원소개", 
      engName: "About",
      href: "/about#director",
      subMenus: [
        { name: "의료진 소개", href: "/about#director" },
        { name: "찾아오시는 길", href: "/#location" },
      ]
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white border-b border-gray-100 ${
          isScrolled ? "py-3 shadow-sm" : "py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image 
                  src="/images/logo.gif" 
                  alt="후한의원 로고" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-black group-hover:text-primary transition-colors">
                  후한의원 구미점
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase leading-none">
                  Hoo Clinic Gumi
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group/nav">
                  <div className="px-5 py-2 flex flex-col items-center">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-tight"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[14px] font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-tight"
                      >
                        {item.name}
                      </Link>
                    )}
                    <span className="text-[8px] font-bold tracking-[0.2em] text-primary uppercase opacity-0 group-hover/nav:opacity-100 transition-opacity">
                      {item.engName}
                    </span>
                  </div>
                  
                  {item.subMenus.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-2xl py-6 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-500 translate-y-4 group-hover/nav:translate-y-0">
                      {item.subMenus.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-8 py-2 text-[12px] text-gray-400 hover:text-primary hover:translate-x-1 transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-6">
              <button
                onClick={openPbtiPopup}
                className="text-primary border border-primary px-4 py-2 md:px-8 md:py-3 text-[10px] md:text-[11px] font-bold tracking-tight hover:bg-primary hover:text-white transition-all rounded-sm whitespace-nowrap"
              >
                내 피부 MBTI는?
              </button>
              <a 
                href="https://event-snowy-ten.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 md:px-8 md:py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary-hover transition-all rounded-sm shadow-lg shadow-primary/20"
              >
                Event
              </a>
              <Link 
                href="https://m.booking.naver.com/booking/6/bizes/449323"
                target="_blank"
                className="hidden md:block bg-accent text-white px-8 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all rounded-sm"
              >
                Reservation
              </Link>
              <button 
                onClick={() => setIsOpen(true)} 
                className="lg:hidden p-2 text-black"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-[110] transition-all duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-8 md:p-12">
          <div className="flex justify-between items-center mb-16 md:mb-24">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image src="/images/logo.gif" alt="Hoo Clinic Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold tracking-tight text-black">후한의원 구미점</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-primary uppercase leading-none">Gumi Branch</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-black">
              <X size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-10">
            {menuItems.map((item, idx) => (
              <div key={item.name} className="group overflow-hidden">
                <Link 
                  href={item.href} 
                  className="flex items-baseline gap-6"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-serif italic text-primary text-2xl">0{idx + 1}</span>
                  <span className="text-5xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
            <div className="group overflow-hidden">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  openPbtiPopup();
                }}
                className="flex items-baseline gap-6 text-left w-full group"
              >
                <span className="font-serif italic text-primary text-2xl">06</span>
                <span className="text-5xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
                  내 피부 MBTI는?
                </span>
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-12 border-t border-gray-100">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Contact us</p>
            <p className="text-2xl font-bold">054.474.1075</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
