"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

            <div className="flex flex-wrap gap-6">
              <Link 
                href="/contact" 
                className="group flex items-center gap-4 bg-black text-white px-8 py-5 rounded-none hover:bg-gray-800 transition-luxury"
              >
                <span className="font-bold tracking-widest uppercase text-sm">Make a Reservation</span>
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
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
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
                  "환부의 증상만이 아닌, <br />
                  <span className="italic">사람의 전체</span>를 바라봅니다."
                </h3>
                <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
                  <p>
                    치료는 단순히 불편함을 없애는 과정이 아닙니다. <br />
                    후한의원 구미점은 환자분 한 분 한 분의 체질과 환경을 깊이 있게 분석하여, 
                    단기적인 호전이 아닌 지속 가능한 건강을 설계합니다.
                  </p>
                  <p>
                    피부 고민부터 다이어트까지, 여러분의 삶이 더 빛날 수 있도록 
                    정교한 맞춤 진료로 함께하겠습니다.
                  </p>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-100 flex items-center gap-6">
                <span className="text-xl font-bold">이언호 대표원장</span>
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
                회복을 위한 <br />
                <span className="text-transparent border-text-white" style={{ WebkitTextStroke: '1px #fff' }}>완벽한 침묵</span>
              </h3>
              <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-lg">
                후한의원 구미점의 프리미엄 1인실은 단순한 병실이 아닙니다. 환자분이 오직 자신의 회복에만 집중할 수 있도록 설계된 호텔급 휴식 공간입니다.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "PRIVATE", desc: "전 병실 쾌적한 1인실 시스템" },
                  { title: "TECH", desc: "최신 모션베드 및 개별 냉난방" },
                  { title: "CARE", desc: "365일 야간 및 주말 집중 진료" }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-8 border-l border-gray-800 pl-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] pt-1">{item.title}</span>
                    <span className="text-lg font-medium">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative overflow-hidden bg-gray-800">
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
    </div>
  );
}
