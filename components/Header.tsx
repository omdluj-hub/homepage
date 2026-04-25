"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  subMenus: { name: string; href: string }[];
  isExternal?: boolean;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { 
      name: "병원소개", 
      href: "/about#director",
      subMenus: [
        { name: "의료진 소개", href: "/about#director" },
        { name: "병원 내부 소개", href: "/about#interior" },
        { name: "찾아오시는 길", href: "/contact" },
      ]
    },
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
      ]
    },
    { 
      name: "피부미용", 
      href: "/clinic/beauty/lifting",
      subMenus: [
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
      href: "/clinic/traffic/treatment",
      subMenus: [
        { name: "교통사고 치료", href: "/clinic/traffic/treatment" },
        { name: "추나요법", href: "/clinic/traffic/chuna" },
        { name: "프리미엄 입원실", href: "/clinic/traffic/room" },
      ]
    },
    { 
      name: "이벤트", 
      href: "/event", 
      subMenus: [],
    },
    { name: "상담문의", href: "/contact", subMenus: [] },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.gif" alt="후한의원 구미점 로고" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-primary">후한의원 <span className="text-point-green text-lg font-normal">구미점</span></span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-primary hover:text-point-green font-bold transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-point-green" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-point-green font-medium transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    {item.subMenus.length > 0 && (
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-point-green transition-transform group-hover:rotate-180" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                )}
                {item.subMenus.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-lg rounded-b-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.subMenus.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-6 py-2 text-sm text-gray-600 hover:bg-secondary hover:text-point-green"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link 
              href="/event" 
              className="bg-point-green text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm animate-pulse"
            >
              이벤트
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name} className="py-2">
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold text-accent mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name} <span className="text-xs font-normal text-gray-400 ml-1">(새창)</span>
                  </a>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="block text-lg font-bold text-primary mb-2"
                      onClick={() => !item.subMenus.length && setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.subMenus.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pl-2">
                        {item.subMenus.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-sm text-gray-600 py-1 hover:text-point-green"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
