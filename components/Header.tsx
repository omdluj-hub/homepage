"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      ],
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
      ],
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
      ],
    },
    {
      name: "이벤트",
      engName: "Promotion",
      href: "https://event-snowy-ten.vercel.app/",
      subMenus: [],
      isExternal: true,
    },
    {
      name: "병원소개",
      engName: "About",
      href: "/about#director",
      subMenus: [
        { name: "의료진 소개", href: "/about#director" },
        { name: "후한의원 칼럼", href: "/about/column" },
        { name: "찾아오시는 길", href: "/#location" },
      ],
    },
  ];

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_-4px_rgba(0,0,0,0.08)] py-3"
            : "bg-white/80 backdrop-blur-xl border-b border-[rgba(201,169,110,0.12)] py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-11 h-11 md:w-13 md:h-13 opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logo.gif"
                  alt="후한의원 로고"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base md:text-[17px] font-bold tracking-tight text-[#1C1917] group-hover:text-primary transition-colors leading-none font-serif">
                  후한의원 구미점
                </span>
                <span className="text-[8px] font-semibold tracking-[0.35em] text-primary uppercase leading-none font-en">
                  Hoo Clinic Gumi
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group/nav"
                  onMouseEnter={() => setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="px-5 py-2 flex flex-col items-center gap-0.5">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-bold text-[#3a3530] hover:text-primary transition-colors tracking-tight"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13px] font-bold text-[#3a3530] hover:text-primary transition-colors tracking-tight"
                      >
                        {item.name}
                      </Link>
                    )}
                    {/* 언더라인 애니메이션 */}
                    <span className="block h-[1.5px] w-0 bg-primary group-hover/nav:w-full transition-all duration-300 origin-left" />
                  </div>

                  {/* 드롭다운 */}
                  {item.subMenus.length > 0 && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white border-t-2 border-primary shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] py-5 transition-all duration-300 ${
                        activeMenu === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-2"
                      }`}
                    >
                      {/* 골드 좌측 라인 */}
                      <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                      {item.subMenus.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-6 py-2 text-[12.5px] font-medium text-[#5a5450] hover:text-primary hover:pl-8 transition-all duration-200"
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
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={openPbtiPopup}
                className="hidden sm:block border border-primary/50 text-primary px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 whitespace-nowrap"
              >
                내 피부 MBTI는?
              </button>
              <a
                href="https://event-snowy-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 text-primary border border-primary/30 px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-white transition-all duration-300"
              >
                Event
              </a>
              <Link
                href="https://m.booking.naver.com/booking/6/bizes/449323"
                target="_blank"
                className="hidden md:block bg-accent text-white px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300"
              >
                Reservation
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-[#1C1917] hover:text-primary transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[108] lg:hidden transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-[110] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 상단 골드 라인 */}
        <div className="h-0.5 bg-gradient-to-r from-primary via-gold-line to-transparent flex-shrink-0" />

        <div className="flex flex-col h-full overflow-y-auto no-scrollbar p-8">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-12 flex-shrink-0">
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-bold tracking-tight text-[#1C1917] font-serif">
                후한의원 구미점
              </span>
              <span className="text-[8px] font-semibold tracking-[0.3em] text-primary uppercase font-en">
                Hoo Clinic Gumi
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#1C1917] hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* 메뉴 */}
          <nav className="flex flex-col gap-6 flex-grow">
            {menuItems.map((item, idx) => (
              <div key={item.name} className="flex flex-col gap-2.5">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-en italic text-primary text-sm opacity-70">
                    0{idx + 1}
                  </span>
                  <span className="text-2xl font-bold tracking-tight text-[#1C1917] group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </Link>
                {item.subMenus.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 pl-9 border-l border-primary/20 ml-1">
                    {item.subMenus.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="text-[12px] font-medium text-[#8a8480] hover:text-primary transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 피부 MBTI */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => { setIsOpen(false); openPbtiPopup(); }}
                className="flex items-baseline gap-4 group text-left"
              >
                <span className="font-en italic text-primary text-sm opacity-70">06</span>
                <span className="text-2xl font-bold tracking-tight text-[#1C1917] group-hover:text-primary transition-colors">
                  내 피부 MBTI는?
                </span>
              </button>
            </div>
          </nav>

          {/* 하단 연락처 */}
          <div className="flex-shrink-0 pt-8 mt-8 border-t border-[#e8e4df]">
            <p className="text-[9px] font-bold tracking-[0.3em] text-[#b5b0aa] uppercase mb-2">
              Contact us
            </p>
            <a
              href="tel:054-474-1075"
              className="text-2xl font-bold text-[#1C1917] hover:text-primary transition-colors tracking-tight"
            >
              054.474.1075
            </a>
            <p className="mt-3 text-[11px] text-[#8a8480]">
              평일 10:30–20:30 &nbsp;|&nbsp; 토요일 10:00–14:00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
