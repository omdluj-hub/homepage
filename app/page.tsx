"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import QuickInquiry from "@/components/QuickInquiry";
import { ArrowRight, Star, Quote } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "/images/1.JPG",
    "/images/2.JPG",
    "/images/3.JPG",
    "/images/5.JPG",
    "/images/7.JPG",
    "/images/8.JPG",
    "/images/10.JPG",
    "/images/후한의원-전경 1.jpg",
  ];

  const inpatientImages = [
    "/images/inpatient/KakaoTalk_20230131_100622250.jpg",
    "/images/inpatient/KakaoTalk_20230131_100611036.jpg",
    "/images/inpatient/KakaoTalk_20230131_100621199.jpg",
    "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const services = [
    {
      title: "여드름/흉터",
      engTitle: "ACNE & SCAR",
      description: "피부 근본을 다스리는 정교한 복원 솔루션",
      image: "/images/clinic/여드름.jpg",
      href: "/clinic/skin/acne",
    },
    {
      title: "다이어트",
      engTitle: "DIET CLINIC",
      description: "체질 맞춤 한약과 과학적인 체중 관리",
      image: "/images/clinic/다이어트 관리.JPG",
      href: "/clinic/diet/medicine",
    },
    {
      title: "피부미용/리프팅",
      engTitle: "AESTHETIC",
      description: "아름다움의 깊이를 더하는 안티에이징 케어",
      image: "/images/clinic/리프팅.jpg",
      href: "/clinic/beauty/lifting",
    },
    {
      title: "1인 입원실",
      engTitle: "PRIVATE WARD",
      description: "회복에만 전념하는 호텔급 독립 휴식 공간",
      image: "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
      href: "/clinic/traffic/room",
    },
  ];

  return (
    <div className="bg-white selection:bg-primary/20">
      {/* 01. Editorial Hero Section with Background Slider */}
      <section className="relative h-screen flex items-center overflow-hidden pt-20">
        {/* Background Slider (Low Opacity) */}
        <div className="absolute inset-0 z-0 bg-gray-50">
          {heroImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
                idx === currentSlide ? 'opacity-20 scale-100 blur-[2px]' : 'opacity-0 scale-110 blur-[5px]'
              }`}
            >
              <Image src={img} alt="Hospital Interior" fill className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/40"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Left Part: Text Content */}
            <div className="lg:col-span-8">
              <div className="overflow-hidden mb-10 flex items-center gap-4 animate-fade-in-up">
                <div className="relative w-12 h-12 md:w-14 md:h-14 opacity-80">
                  <Image src="/images/logo.gif" alt="Hoo Clinic Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold tracking-tight text-black">후한의원 구미점</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase leading-none">Gumi Branch</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-8xl lg:text-[100px] leading-[1] mb-12 text-black animate-fade-in-up reveal-delay-1 tracking-tight">
                A Healing Space <br />
                <span className="font-serif italic text-primary">Designed for</span> <br />
                Your Recovery
              </h1>

              <div className="relative pl-8 border-l border-primary/20 animate-fade-in-up reveal-delay-2 max-w-xl">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed break-keep font-medium">
                  365일 쉼 없이 움직이는 당신을 위해 <br />
                  가장 정교하고 따뜻한 치유의 공간을 제안합니다.
                </p>
                <p className="mt-4 text-sm text-gray-400 font-light italic">
                  Premium Ward & Medical Aesthetic
                </p>
              </div>
            </div>

            {/* Right Part: Reservation Buttons */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-4 animate-fade-in-up reveal-delay-2">
              <Link 
                href="https://m.booking.naver.com/booking/6/bizes/449323" 
                target="_blank"
                className="bg-primary text-white px-12 py-6 text-[14px] font-bold tracking-[0.2em] uppercase hover:bg-primary-hover transition-all rounded-sm shadow-2xl shadow-primary/20 text-center min-w-[280px]"
              >
                네이버 예약하기
              </Link>
              <Link 
                href="https://bbs-ruddy-iota.vercel.app/diet" 
                target="_blank"
                className="bg-accent text-white px-12 py-6 text-[14px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all rounded-sm text-center min-w-[280px] shadow-lg"
              >
                비대면 상담 (다이어트)
              </Link>
              <Link 
                href="https://event-snowy-ten.vercel.app/" 
                target="_blank"
                className="bg-white border border-gray-200 text-gray-600 px-12 py-6 text-[14px] font-bold tracking-[0.2em] uppercase hover:bg-gray-50 transition-all rounded-sm text-center min-w-[280px] shadow-sm"
              >
                이벤트 확인
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
      </section>

      {/* 02. Philosophy Section (Asymmetric) */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/40 -skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] relative z-10 overflow-hidden shadow-2xl luxury-border">
                  <Image 
                    src="/images/프로필사진.JPG" 
                    alt="Director Lee" 
                    fill 
                    className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 -z-10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 text-[120px] font-serif text-primary/5 select-none -z-10 leading-none">Philosophy</div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="mb-12">
                <Quote className="text-primary mb-8 opacity-40" size={48} strokeWidth={1} />
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-10 text-black leading-tight">
                  Sincerity in <br />
                  <span className="font-serif italic">Every Touch</span>
                </h2>
                <div className="space-y-8 text-lg text-gray-500 font-light leading-relaxed break-keep">
                  <p>
                    진정한 아름다움은 단순한 시술이 아닌, 환자의 고민을 깊이 있게 이해하는 진심에서 시작됩니다. 
                    후한의원 구미점은 환부만을 보지 않고, 당신의 삶과 체질을 온전히 마주합니다.
                  </p>
                  <p>
                    우리는 자연스러운 변화를 지향합니다. 인위적인 아름다움이 아닌, 
                    당신이 가진 본연의 가치가 가장 빛날 수 있는 가장 정교하고 건강한 길을 제시하겠습니다.
                  </p>
                </div>
              </div>
              <div className="pt-10 border-t border-primary/20 inline-flex flex-col gap-2">
                <span className="text-xl font-bold tracking-tight text-black">이언호 대표원장</span>
                <span className="text-xs font-medium text-primary tracking-widest uppercase">Representative Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Signature Services (Grid) */}
      <section className="section-padding bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 border-b border-gray-100 pb-12 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-6">Expertise</h2>
              <h3 className="text-5xl md:text-6xl text-black">OUR SIGNATURES</h3>
            </div>
            <p className="text-sm text-gray-400 font-medium max-w-xs leading-relaxed">
              정밀한 분석과 풍부한 임상 경험을 바탕으로 만족스러운 결과를 위해 노력하는 후한의원의 주요 진료 항목입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 luxury-shadow">
            {services.map((service, idx) => (
              <Link 
                key={service.title} 
                href={service.href}
                className="group relative aspect-[3/4] bg-white p-12 flex flex-col justify-between overflow-hidden transition-luxury hover:bg-secondary"
              >
                <div className="relative z-10">
                  <span className="block text-[10px] font-bold tracking-[0.3em] text-primary mb-4">0{idx + 1}</span>
                  <h4 className="text-2xl font-bold tracking-tight text-black mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase">{service.engTitle}</span>
                </div>
                
                <div className="relative z-10">
                  <p className="text-sm text-gray-400 font-light mb-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">
                    {service.description}
                  </p>
                  <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <ArrowRight size={14} />
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                   <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Immersive Facility (Full Width) */}
      <section className="relative min-h-[80vh] flex items-center bg-accent overflow-hidden">
        <div className="absolute inset-0 z-0">
          {inpatientImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-2000 ${idx === (currentSlide % inpatientImages.length) ? 'opacity-40 scale-100' : 'opacity-0 scale-110'}`}
            >
              <Image src={img} alt="Facility" fill className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary/60 mb-8">Premium Ward</h2>
            <h3 className="text-5xl md:text-7xl text-white leading-tight mb-12">
              Deep Rest, <br />
              <span className="font-serif italic text-primary">Private Healing</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
              <div className="space-y-4 border-l border-primary/30 pl-8">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">Independence</p>
                <p className="text-gray-400 font-light leading-relaxed">완벽하게 분리된 독립형 1인실 시스템으로 최적의 휴식을 보장합니다.</p>
              </div>
              <div className="space-y-4 border-l border-primary/30 pl-8">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">365 Intensive</p>
                <p className="text-gray-400 font-light leading-relaxed">주말과 공휴일에도 끊김 없는 집중 진료 체계를 유지합니다.</p>
              </div>
            </div>
            
            <Link 
              href="/clinic/traffic/room"
              className="inline-flex items-center gap-6 group"
            >
              <span className="text-sm font-bold tracking-[0.2em] text-white uppercase border-b border-primary/40 pb-2 group-hover:border-primary transition-all">Explore Facility</span>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-12 right-12 flex items-baseline gap-4 text-white">
          <span className="text-4xl font-serif italic text-primary">0{(currentSlide % inpatientImages.length) + 1}</span>
          <span className="text-xs font-bold tracking-widest opacity-20">/ 0{inpatientImages.length}</span>
        </div>
      </section>

      {/* 05. Concierge & Quick Inquiry */}
      <section className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5" id="location">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-10">Concierge</h2>
              <h3 className="text-5xl mb-16 text-black uppercase">Visit Us</h3>
              
              <div className="space-y-16">
                {/* Re-added Google Map */}
                <div className="bg-gray-100 aspect-video w-full luxury-border shadow-sm overflow-hidden mb-12 grayscale hover:grayscale-0 transition-all duration-1000">
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

                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">Location</p>
                  <p className="text-2xl font-bold tracking-tight text-black mb-4">
                    경북 구미시 인동가산로 9-3 <br /> 노블레스타워 4층 (황상동)
                  </p>
                  <a 
                    href="https://naver.me/5N15Owng" 
                    target="_blank" 
                    className="inline-flex items-center gap-3 text-sm font-bold text-primary hover:gap-5 transition-all"
                  >
                    네이버 지도에서 보기 <ArrowRight size={14} />
                  </a>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">Hours</p>
                  <div className="space-y-4 max-w-sm">
                    <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                      <span className="text-gray-400">평일 (야간진료)</span>
                      <span className="font-bold text-black">10:30 - 20:30</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                      <span className="text-gray-400">토요일</span>
                      <span className="font-bold text-black">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between text-sm italic">
                      <span className="text-primary font-bold">휴진</span>
                      <span className="text-primary font-bold">일요일 / 공휴일 / 목요일</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="bg-white p-12 lg:p-20 shadow-2xl luxury-border relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary -z-10 translate-x-10 -translate-y-10"></div>
                  <h4 className="text-3xl font-bold mb-12 text-black tracking-tight">Quick Inquiry</h4>
                  <QuickInquiry />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
