"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const interiorImages = [
    { src: "/images/후한의원-전경 1.jpg", title: "병원 로비 및 대기실" },
    { src: "/images/1.JPG", title: "깔끔한 내부 복도" },
    { src: "/images/2.JPG", title: "프라이빗한 진료 대기 공간" },
    { src: "/images/3.JPG", title: "편안한 상담 및 진료 공간" },
    { src: "/images/5.JPG", title: "최신식 검사 및 진단 장비" },
    { src: "/images/7.JPG", title: "청결한 치료 및 케어룸" },
    { src: "/images/8.JPG", title: "아늑한 1인 집중 치료실" },
    { src: "/images/10.JPG", title: "쾌적한 휴식 및 입원 환경" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % interiorImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + interiorImages.length) % interiorImages.length);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">병원 소개</h1>
          <p className="text-lg text-muted">후한의원 구미점이 걷고 있는 진료의 길을 소개합니다.</p>
        </div>
      </section>

      {/* Director Introduction */}
      <section id="director" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-16">
            <div className="md:w-2/5 sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] w-full max-w-sm mx-auto border-8 border-gray-50">
                <Image 
                  src="/images/프로필사진.JPG" 
                  alt="이언호 대표원장" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-3/5">
              <span className="text-point-green font-bold mb-2 block tracking-widest uppercase text-sm">Representative Director</span>
              <h2 className="text-4xl font-bold text-primary mb-4">이언호 대표원장</h2>
              <p className="text-xl text-muted mb-12 italic text-gray-500">"진심을 담은 진료로 삶의 질을 높여드리겠습니다."</p>
              
              <div className="grid grid-cols-1 gap-12">
                {/* 약력 Section */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-point-green"></span>
                    [약력]
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="font-bold text-point-green">현) 구미 후한의원 대표원장</li>
                    <li className="font-bold text-point-green">현) 닥톡 네이버지식in 상담한의사</li>
                    <li className="pt-2">서울대학교 자연과학대학</li>
                    <li>대전대학교 한의과대학 졸업</li>
                    <li>전) 바른손한의원 대표원장</li>
                    <li>전) 바른재활병원 진료과장</li>
                    <li className="pt-2">한의사협회 주관 허준축제 위촉진료한의사</li>
                    <li>SBS 생활경제 자문한의사 출연</li>
                    <li>의료봉사단 보륜 지도한의사</li>
                  </ul>
                </div>

                {/* 학회활동 Section */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-point-green"></span>
                    [학회활동]
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-600 text-sm">
                    <p>• 대한 독의학 연구회 정회원</p>
                    <p>• 대한 트랜스테라피 연구회 정회원</p>
                    <p>• 대한 한의학회 정회원</p>
                    <p>• 한방 피부과학회 정회원</p>
                    <p>• 한방 비만학회 정회원</p>
                    <p>• 국제 한의학회 정회원</p>
                    <p>• 대한 동의방약학회 정회원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Interior Slider Section */}
      <section id="interior" className="py-24 bg-secondary scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4 italic">Hospital Tour</h2>
            <p className="text-muted">후한의원 구미점의 쾌적한 공간을 확인해 보세요.</p>
          </div>
          
          <div className="relative group max-w-5xl mx-auto">
            {/* Main Slider */}
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-black">
              {interiorImages.map((image, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image src={image.src} alt="병원 내부 시설" fill className="object-cover" />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 gap-3">
              {interiorImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-point-green w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Philosophy */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-12 italic">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 text-2xl">🌱</div>
              <h3 className="text-xl font-bold text-primary mb-4">자연스러운 회복</h3>
              <p className="text-sm text-muted">우리 몸이 가진 본연의 재생 능력을 극대화하여 부작용 없는 치료를 추구합니다.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 text-2xl">🤝</div>
              <h3 className="text-xl font-bold text-primary mb-4">공감과 소통</h3>
              <p className="text-sm text-muted">환자의 목소리에 귀 기울이며, 치료의 전 과정을 함께 고민하고 소통합니다.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 text-2xl">✨</div>
              <h3 className="text-xl font-bold text-primary mb-4">정직한 진료</h3>
              <p className="text-sm text-muted">필요하지 않은 진료는 권하지 않으며, 정직하고 투명한 의료 서비스를 약속합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
