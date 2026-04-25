"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ExternalLink, Menu, X, ChevronDown } from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  subMenus: { name: string; href: string }[];
  isExternal?: boolean;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { 
      name: "피부 클리닉", 
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
      href: "https://event-snowy-ten.vercel.app/", 
      subMenus: [],
      isExternal: true
    },
    { 
      name: "병원소개", 
      href: "/about#director",
      subMenus: [
        { name: "의료진 소개", href: "/about#director" },
        { name: "찾아오시는 길", href: "/#location" },
      ]
    },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-luxury ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-gray-100" : "bg-transparent py-8"}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-4">
            <span className="text-2xl font-black tracking-tighter text-black">HOO CLINIC</span>
            <span className="h-4 w-[1px] bg-gray-300"></span>
            <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-black transition-colors uppercase">Gumi</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group/nav"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 text-[13px] font-bold tracking-tight text-gray-600 hover:text-black transition-colors flex items-center gap-1 uppercase"
                  >
                    {item.name}
                    <ExternalLink size={12} className="opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="px-5 py-2 text-[13px] font-bold tracking-tight text-gray-600 hover:text-black transition-colors flex items-center gap-1 uppercase"
                  >
                    {item.name}
                    {item.subMenus.length > 0 && <ChevronDown size={14} className="opacity-40 group-hover/nav:rotate-180 transition-transform" />}
                  </Link>
                )}
                
                {item.subMenus.length > 0 && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-2xl py-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-luxury">
                    {item.subMenus.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-6 py-2 text-[12px] text-gray-400 hover:text-black hover:translate-x-1 transition-luxury"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://event-snowy-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block bg-black text-white px-6 py-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-luxury"
            >
              Event
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 text-black"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[90] lg:hidden transition-luxury transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col h-full pt-32 px-12 overflow-y-auto pb-12">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-8 border-b border-gray-50 pb-8">
              {item.isExternal ? (
                <a href={item.href} target="_blank" className="text-3xl font-black tracking-tighter" onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>
              ) : (
                <>
                  <Link href={item.href} className="text-3xl font-black tracking-tighter block mb-6" onClick={() => !item.subMenus.length && setIsOpen(false)}>
                    {item.name}
                  </Link>
                  <div className="grid grid-cols-1 gap-4 pl-4">
                    {item.subMenus.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.href} 
                        className="text-lg text-gray-400 font-light hover:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
