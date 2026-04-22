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
    }, 3000);
    return () => clearInterval(timer);
  }, [inpatientImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % inpatientImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + inpatientImages.length) % inpatientImages.length);

  const services = [
    {
      title: "여드름/여드름흉터",
      description: "재발 없는 여드름 치료와 정교한 흉터 복원",
      image: "/images/clinic/여드름.jpg",
      href: "/clinic/skin/acne",
    },
    {
      title: "피부질환",
      description: "아토피, 지루성피부염, 건선 등 근본 치료",
      image: "/images/clinic/지루성피부염.jpg",
      href: "/clinic/skin/seborrheic",
    },
    {
      title: "피부미용",
      description: "탄력, 미백, 리프팅으로 완성하는 피부 자신감",
      image: "/images/clinic/리프팅.jpg",
      href: "/clinic/beauty/lifting",
    },
    {
      title: "다이어트",
      description: "체질 맞춤 한약과 체계적인 요요 방지 관리",
      image: "/images/clinic/다이어트 관리.JPG",
      href: "/clinic/diet/medicine",
    },
    {
      title: "교통사고 입원실",
      description: "365일 운영되는 쾌적한 1인실 집중 치료",
      image: "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
      href: "/clinic/traffic/room",
    },
  ];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-primary text-white overflow-hidden py-20 lg:py-0">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content: Text */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/30 rounded-full mb-8">
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/60 uppercase">Premium Clinic</span>
                <span className="w-[1px] h-3 bg-white/20"></span>
                <span className="text-xs font-semibold text-[#9AE6B4]">후한의원 구미점</span>
              </div>

              <div className="mb-10 break-keep">
                <p className="text-xl md:text-2xl font-light text-white/90 mb-4 tracking-tight">
                  당신의 건강한 아름다움,
                </p>
                <div className="flex flex-col sm:flex-row items-center lg:items-center gap-4 md:gap-8 justify-center lg:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/logo.gif" 
                    alt="후한의원 로고" 
                    className="h-20 md:h-28 xl:h-36 w-auto brightness-0 invert flex-shrink-0" 
                  />
                  <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold !text-white leading-[1.1] tracking-tight">
                    <span className="block">후한의원</span>
                    <span className="text-[#9AE6B4] whitespace-nowrap">구미점</span>
                  </h1>
                </div>
              </div>

              <div className="max-w-xl mx-auto lg:mx-0 mb-12 break-keep">
                <p className="text-lg md:text-xl !text-white/70 font-light leading-relaxed">
                  여드름 치료부터 다이어트, 쾌적한 1인실 입원실까지<br className="hidden md:block" />
                  <span className="font-semibold text-white">구미 인동</span>에서 한 분 한 분을 위한 정교한 <span className="whitespace-nowrap">맞춤 진료를 약속드립니다.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a 
                  href="https://bbs-ruddy-iota.vercel.app/diet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex flex-col items-center justify-center bg-white text-[#5a8d54] px-10 py-4 rounded-full font-bold transition-all shadow-lg min-w-[220px]"
                >
                  <span className="text-lg">비대면 상담 신청</span>
                  <span className="text-sm font-medium opacity-80">(다이어트)</span>
                </a>
                <a 
                  href="https://m.booking.naver.com/booking/6/bizes/449323" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-[#03C75A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#02b350] transition-all shadow-lg min-w-[220px]"
                >
                  네이버 예약
                </a>
              </div>
            </div>
            {/* Right Content: Image */}
            <div className="lg:w-1/2 w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group bg-white/5">
                <Image 
                  src="/images/hero-main.png?v=1" 
                  alt="후한의원 구미점 대표 이미지" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-[#9AE6B4]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Background Pattern */}
      <div className="relative">
        <div 
          className="absolute inset-0 z-0 opacity-[0.3] pointer-events-none"
          style={{ 
            backgroundImage: 'url("/images/bg-pattern.png")',
            backgroundSize: '400px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        <div className="relative z-10 flex flex-col">
          {/* Director Greeting Section */}
          <section className="py-24 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24">
                {/* Director Photo (Right) - Keep solid background for the photo frame only */}
                <div className="w-full md:w-2/5 max-w-sm">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 group">
                    <Image 
                      src="/images/프로필사진.JPG" 
                      alt="후한의원 구미점 이언호 대표원장" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  </div>
                </div>

                {/* Director Text (Left) */}
                <div className="w-full md:w-3/5 text-center md:text-left">
                  <span className="inline-block px-4 py-1 bg-secondary text-point-green rounded-full text-sm font-bold mb-6 shadow-sm">
                    Representative Director
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight break-keep">
                    "환자분들의 일상이 <span className="text-point-green whitespace-nowrap">더욱 건강하고 아름답도록</span>,<br className="hidden lg:block" /> 진심을 다해 진료하겠습니다."
                  </h2>
                  <div className="space-y-6 text-lg text-gray-700 mb-10 leading-relaxed break-keep">
                    <p>
                      안녕하십니까, 후한의원 구미점 대표원장 <span className="font-bold text-gray-900 underline decoration-point-green/30 decoration-4 underline-offset-4">이언호</span>입니다.
                    </p>
                    <p>
                      우리 몸은 스스로 치유하고 재생할 수 있는 놀라운 힘을 가지고 있습니다. 
                      하지만 불규칙한 생활과 스트레스, 각종 환경 요인으로 인해 그 균형이 깨지면 피부 문제와 비만이 찾아오게 됩니다.
                    </p>
                    <p>
                      후한의원 구미점은 단순히 겉으로 보이는 증상만을 치료하지 않습니다. 
                      보이지 않는 몸속 원인부터 세밀하게 분석하여, 환자분 한 분 한 분에게 가장 적합한 <span className="font-semibold text-primary">1:1 맞춤 통합 솔루션</span>을 제시해 드립니다.
                    </p>
                    <p>
                      치료의 모든 과정에서 환자분과 소통하며, 여러분의 삶의 질이 더 높아질 수 있도록 든든한 건강 파트너가 되어드릴 것을 약속드립니다.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8">
                    <p className="text-xl font-bold text-primary italic border-b-2 border-point-green pb-1">후한의원 구미점 대표원장 이언호</p>
                    <Link href="/about#director" className="inline-flex flex-col items-center justify-center bg-point-green text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:bg-[#4a7d44] hover:-translate-y-1 group">
                      <span className="text-xs opacity-90 font-medium mb-1">의료진 소개</span>
                      <span className="text-lg">자세히 보기</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 italic tracking-tight">Clinics & Services</h2>
                <p className="text-muted text-lg">후한의원 구미점의 주요 진료 과목을 소개합니다.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service, index) => (
                  <Link 
                    key={service.title} 
                    href={service.href}
                    className="group flex flex-col bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40"              >
                    <div className="h-64 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-point-green transition-colors">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-bold text-point-green">
                        자세히 보기
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Special Feature: Inpatient Room */}
          <section className="py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 w-full">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] w-full border-4 border-white">
                {inpatientImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <Image 
                      src={img} 
                      alt={`프리미엄 1인 입원실 ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {inpatientImages.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-point-green font-bold mb-4 block tracking-widest uppercase text-sm">Premium 1-Person Room</span>
              <h2 className="text-4xl font-bold text-primary mb-8 leading-tight">
                회복에만 전념할 수 있는<br />
                프라이빗 프리미엄 1인실
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                후한의원 구미점은 환자분들의 빠른 쾌유를 위해 모든 병실을 쾌적한 1인실로 운영하고 있습니다. 
                호텔급 시설의 편안함 속에서 사고 후유증 및 집중 치료에만 집중하실 수 있도록 최상의 환경을 제공합니다.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <span className="text-point-green font-bold block mb-1">365일</span>
                  <p className="text-sm text-gray-500">입원실 상시 운영</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <span className="text-point-green font-bold block mb-1">모션베드</span>
                  <p className="text-sm text-gray-500">전 병실 최신 도입</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <span className="text-point-green font-bold block mb-1">쾌적 시설</span>
                  <p className="text-sm text-gray-500">개별 냉난방 시스템</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <span className="text-point-green font-bold block mb-1">집중 케어</span>
                  <p className="text-sm text-gray-500">1:1 맞춤 집중 진료</p>
                </div>
              </div>
              <Link href="/clinic/traffic/room" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg">
                프리미엄 입원실 자세히 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </div>
  );
}
