"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import QuickInquiry from "@/components/QuickInquiry";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const inpatientImages = [
    "/images/inpatient/KakaoTalk_20230131_100622250.jpg",
    "/images/inpatient/KakaoTalk_20230131_100611036.jpg",
    "/images/inpatient/KakaoTalk_20230131_100621199.jpg",
    "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
    "/images/inpatient/KakaoTalk_20230131_100624110.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % inpatientImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [inpatientImages.length]);

  const services = [
    {
      title: "여드름/여드름흉터",
      category: "Skin Clinic",
      description: "재발 없는 여드름 치료와 정교한 흉터 복원",
      image: "/images/clinic/여드름.jpg",
      href: "/clinic/skin/acne",
    },
    {
      title: "피부질환",
      category: "Medical Skin",
      description: "아토피, 지루성피부염, 건선 등 근본 원인 치료",
      image: "/images/clinic/지루성피부염.jpg",
      href: "/clinic/skin/seborrheic",
    },
    {
      title: "피부미용/리프팅",
      category: "Aesthetic",
      description: "탄력과 미백, 리프팅으로 완성하는 피부 자신감",
      image: "/images/clinic/리프팅.jpg",
      href: "/clinic/beauty/lifting",
    },
    {
      title: "다이어트",
      category: "Weight Loss",
      description: "체질 맞춤 한약과 체계적인 요요 방지 관리",
      image: "/images/clinic/다이어트 관리.JPG",
      href: "/clinic/diet/medicine",
    },
    {
      title: "1인 입원실",
      category: "Premium Ward",
      description: "365일 운영되는 쾌적한 1인실 집중 치료",
      image: "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
      href: "/clinic/traffic/room",
    },
  ];

  return (
    <div className="bg-white">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-main.png?v=1" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-90 scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-black"></span>
              <span className="text-sm font-bold tracking-[0.3em] uppercase">Hoo Clinic Gumi</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.9] mb-12 text-black">
              TRUE <br />
              <span className="text-transparent border-text-black" style={{ WebkitTextStroke: '2px #000' }}>BEAUTY</span> <br />
              REBORN
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-light mb-12 max-w-xl leading-relaxed text-balance">
              겉으로 보이는 아름다움을 넘어, 내면의 균형에서 시작되는 진정한 변화. 후한의원 구미점이 당신의 본연의 빛을 찾아드립니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="https://m.booking.naver.com/booking/6/bizes/449323" 
                target="_blank"
                className="group flex items-center gap-4 bg-black text-white px-8 py-5 rounded-none hover:bg-gray-800 transition-luxury"
              >
                <span className="font-bold tracking-widest uppercase text-sm">예약하기</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="https://bbs-ruddy-iota.vercel.app/diet" 
                target="_blank"
                className="group flex items-center gap-4 bg-white border border-black text-black px-8 py-5 rounded-none hover:bg-gray-50 transition-luxury"
              >
                <span className="font-bold tracking-widest uppercase text-sm">비대면 다이어트 상담</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalism Director Section */}
      <section className="py-32 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden shadow-2xl">
                <Image 
                  src="/images/프로필사진.JPG" 
                  alt="Director" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-black/5 -z-10"></div>
            </div>
            
            <div className="lg:col-span-7">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-8">Representative Director</h2>
              <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                  &quot;환부의 증상만이 아닌, <br />
                  <span className="italic text-point-green">사람의 전체</span>를 바라봅니다.&quot;
                </h3>
                <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed break-keep">
                  <p>
                    반갑습니다. 후한의원 구미점 대표원장 이언호입니다. <br />
                    제가 생각하는 진정한 치료란 단순히 겉으로 드러난 통증이나 증상을 잠재우는 것이 아닙니다. 
                  </p>
                  <p>
                    피부 고민부터 다이어트, 사고 후유증까지 모든 질환의 뿌리는 몸 내부의 불균형에 있습니다. 
                    우리는 환자분 한 분 한 분의 체질과 생활 환경을 깊이 있게 분석하여, 
                    우리 몸이 가진 본연의 자생력을 회복할 수 있는 가장 자연스럽고 정교한 길을 제시합니다.
                  </p>
                  <p>
                    정직한 진료와 따뜻한 소통으로 여러분의 일상이 다시 건강하게 빛날 수 있도록 
                    치료의 전 과정을 책임지고 함께하겠습니다.
                  </p>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-100 flex items-center gap-6">
                <span className="text-xl font-bold text-black">이언호 대표원장</span>
                <Link href="/about#director" className="text-sm font-bold border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">
                  의료진 정보 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid-based Services Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6">Expertise</h2>
              <h3 className="text-5xl font-black tracking-tighter">OUR CLINICS</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-gray-100 border border-gray-100">
            {services.map((service) => (
              <Link 
                key={service.title} 
                href={service.href}
                className="group relative aspect-[3/4] bg-white overflow-hidden"
              >
                <div className="absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-luxury duration-1000 grayscale group-hover:grayscale-0">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end text-black group-hover:text-white transition-colors duration-500">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-60">{service.category}</span>
                  <h4 className="text-3xl font-bold mb-4 tracking-tight">{service.title}</h4>
                  <p className="text-sm opacity-0 group-hover:opacity-80 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Facility Section */}
      <section className="py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500 mb-8">Spatial Experience</h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-12 leading-[1.1]">
                오직 회복에만 집중하는 <br />
                <span className="text-transparent border-text-white" style={{ WebkitTextStroke: '1px #fff' }}>프라이빗한 휴식</span>
              </h3>
              <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-lg break-keep">
                후한의원 구미점의 프리미엄 1인실은 단순한 병실이 아닙니다. 환자분이 오직 자신의 회복에만 전념할 수 있도록 설계된 호텔급 감성의 치유 공간입니다.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "PRIVATE", desc: "전 병실 쾌적한 독립형 1인실 시스템" },
                  { title: "TECH", desc: "최신 프리미엄 모션베드 및 개별 냉난방" },
                  { title: "CARE", desc: "365일 야간 및 주말 집중 진료 체계" }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-8 border-l border-gray-800 pl-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] pt-1 text-gray-500">{item.title}</span>
                    <span className="text-lg font-medium text-gray-200">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative overflow-hidden bg-gray-800 border border-white/5 shadow-2xl">
                {inpatientImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image src={img} alt="Facility" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-12 hidden xl:block">
                <div className="flex flex-col gap-4">
                  {inpatientImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-12 w-[2px] transition-all duration-500 ${idx === currentSlide ? 'bg-white' : 'bg-gray-800'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Section */}
      <section className="bg-white py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div id="location">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-8">Location & Hours</h2>
              <h3 className="text-4xl font-black tracking-tighter mb-12 text-black">CONTACT US</h3>
              
              <div className="bg-gray-50 aspect-video w-full mb-12 grayscale hover:grayscale-0 transition-all duration-1000 border border-gray-100 shadow-inner overflow-hidden">
                <iframe 
                  src="https://maps.google.com/maps?q=후한의원%20구미점&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="후한의원 구미점 오시는 길"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Address</p>
                  <p className="text-lg font-medium text-black leading-relaxed">
                    경북 구미시 인동가산로 9-3 4층 <br />
                    (황상동)
                  </p>
                  <a 
                    href="https://naver.me/5N15Owng" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-bold border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
                  >
                    Get Directions
                  </a>
                </div>
                <div className="space-y-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Consultation</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex justify-between border-b border-gray-50 pb-2"><span>평일</span> <span>10:30 - 20:30</span></p>
                    <p className="flex justify-between border-b border-gray-50 pb-2"><span>토요일</span> <span>10:00 - 14:00</span></p>
                    <p className="flex justify-between font-bold text-black italic"><span>휴진</span> <span>목요일, 일요일, 공휴일</span></p>
                    <p className="text-[11px] text-gray-400 pt-2">* 입원실은 365일 상시 운영됩니다.</p>
                    <p className="text-[11px] text-gray-400">* 점심시간: 13:00 - 14:00 (평일)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-8">Concierge</h2>
              <h3 className="text-4xl font-black tracking-tighter mb-12 text-black">QUICK INQUIRY</h3>
              <div className="bg-white border border-gray-100 p-12 text-black shadow-xl">
                <QuickInquiry />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
