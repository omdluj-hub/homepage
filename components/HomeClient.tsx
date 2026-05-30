"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import QuickInquiry from "@/components/QuickInquiry";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  thumbnail: string | null;
}

const BlogPostsLimit3 = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post, idx) => (
        <article
          key={idx}
          className="group bg-white overflow-hidden flex flex-col h-full border border-[#e8e4df] hover:border-primary/40 hover:shadow-[0_8px_40px_-8px_rgba(139,115,85,0.18)] transition-all duration-500"
        >
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[16/10] overflow-hidden block"
          >
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
              />
            ) : (
              <div className="w-full h-full bg-[#F5F3F0] flex items-center justify-center">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#c9c2bb]">Hoo Clinic</span>
              </div>
            )}
          </a>
          <div className="p-7 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-[9px] font-bold text-primary mb-4 uppercase tracking-[0.25em]">
              <Calendar size={10} />
              {new Date(post.pubDate).toLocaleDateString("ko-KR")}
            </div>
            <h4 className="text-[17px] font-bold text-[#1C1917] mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug tracking-tight">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </h4>
            <p className="text-sm text-[#8a8480] line-clamp-2 mb-7 font-light leading-relaxed">
              {post.contentSnippet}
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold text-primary tracking-[0.2em] uppercase group/link"
            >
              Read More{" "}
              <ArrowRight
                size={12}
                className="group-hover/link:translate-x-1.5 transition-transform duration-300"
              />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};

// 스크롤 리빌 훅
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function HomeClient() {
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

  // 스크롤 리빌 refs
  const philosophyRef = useReveal();
  const servicesRef = useReveal();
  const blogRef = useReveal();
  const facilityRef = useReveal();
  const visitRef = useReveal();

  return (
    <div className="bg-white selection:bg-primary/20 selection:text-[#1C1917]">

      {/* ══════════════════════════════════════════════════
          01. Hero Section
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-80px)] lg:h-screen flex items-center overflow-hidden pt-24 lg:pt-20">

        {/* 배경 슬라이더 */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[3500ms] ease-in-out ${
                idx === currentSlide
                  ? "opacity-15 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <Image src={img} alt="후한의원 내부" fill className="object-cover" />
            </div>
          ))}
          {/* 다중 레이어 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20" />
        </div>

        {/* 데코 라인 */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* 좌: 텍스트 */}
            <div className="lg:col-span-8">

              {/* 로고 + 브랜드 */}
              <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
                <div className="relative w-12 h-12 md:w-14 md:h-14">
                  <Image src="/images/logo.gif" alt="후한의원 로고" fill className="object-contain opacity-85" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-[15px] font-bold tracking-tight text-[#1C1917] font-serif">
                    후한의원 구미점
                  </span>
                  <span className="text-[8px] font-semibold tracking-[0.3em] text-primary uppercase font-en">
                    Gumi Branch
                  </span>
                </div>
              </div>

              {/* 헤드라인 */}
              <h1 className="animate-fade-in-up reveal-delay-1 text-[clamp(2.8rem,8vw,7rem)] leading-[1.05] tracking-[-0.04em] mb-10 text-[#1C1917]">
                A Healing Space <br />
                <span className="font-serif italic text-primary font-light">Designed for</span>{" "}
                <br />
                Your Recovery
              </h1>

              {/* 서브카피 */}
              <div className="animate-fade-in-up reveal-delay-2 relative pl-6 max-w-lg mb-12">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-primary/10" />
                <p className="text-base md:text-lg text-[#5a5450] leading-relaxed font-light break-keep">
                  365일 쉼 없이 움직이는 당신을 위해 <br />
                  가장 정교하고 따뜻한 치유의 공간을 제안합니다.
                </p>
                <p className="mt-4 text-[9px] text-[#b5b0aa] font-semibold italic uppercase tracking-[0.3em] font-en">
                  Premium Ward & Medical Aesthetic
                </p>
              </div>
            </div>

            {/* 우: 예약 버튼 */}
            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end gap-3 animate-fade-in-up reveal-delay-3">
              <Link
                href="https://m.booking.naver.com/booking/6/bizes/449323"
                target="_blank"
                className="group relative bg-accent text-white px-10 py-5 text-[11px] font-bold tracking-[0.25em] uppercase text-center overflow-hidden transition-all duration-500 hover:bg-primary"
              >
                <span className="relative z-10">네이버 예약하기</span>
              </Link>
              <Link
                href="https://bbs-ruddy-iota.vercel.app/diet"
                target="_blank"
                className="border border-primary/40 text-primary px-10 py-5 text-[11px] font-bold tracking-[0.25em] uppercase text-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-400"
              >
                비대면 상담 (다이어트)
              </Link>
              <Link
                href="https://event-snowy-ten.vercel.app/"
                target="_blank"
                className="bg-[#F5F3F0] border border-[#e8e4df] text-[#5a5450] px-10 py-5 text-[11px] font-bold tracking-[0.25em] uppercase text-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-400"
              >
                이벤트 실시간 예약
              </Link>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/60 to-transparent" />
          <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#b5b0aa]">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          02. Philosophy Section
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-accent relative overflow-hidden">
        {/* 배경 텍스처 */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px)" }}
        />
        {/* 골드 원형 데코 */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-primary/10" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-primary/8" />

        <div ref={philosophyRef} className="reveal max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* 이미지 */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden border border-[rgba(201,169,110,0.2)]">
                  <Image
                    src="/images/프로필사진.JPG"
                    alt="이언호 대표원장"
                    fill
                    className="object-cover grayscale-[0.15] hover:grayscale-0 transition-all duration-1000"
                  />
                  {/* 이미지 오버레이 그라데이션 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent" />
                </div>
                {/* 골드 코너 데코 */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold-line" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold-line" />
              </div>
            </div>

            {/* 텍스트 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="mb-3">
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary mb-8 font-en">
                  Our Philosophy
                </p>
                <span className="gold-divider mb-10" />
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] mb-10 text-white leading-tight tracking-tight">
                Sincerity in <br />
                <span className="font-serif italic font-light text-primary">Every Touch</span>
              </h2>
              <div className="space-y-6 text-[15px] text-[#a09890] font-light leading-relaxed break-keep mb-12">
                <p>
                  진정한 아름다움은 단순한 시술이 아닌, 환자의 고민을 깊이 있게 이해하는
                  진심에서 시작됩니다. 후한의원 구미점은 환부만을 보지 않고, 당신의 삶과
                  체질을 온전히 마주합니다.
                </p>
                <p>
                  우리는 자연스러운 변화를 지향합니다. 인위적인 아름다움이 아닌, 당신이
                  가진 본연의 가치가 가장 빛날 수 있는 가장 정교하고 건강한 길을
                  제시하겠습니다.
                </p>
              </div>
              <div className="pt-8 border-t border-[rgba(201,169,110,0.2)] inline-flex flex-col gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-serif">
                  이언호 대표원장
                </span>
                <span className="text-[9px] font-semibold text-primary tracking-[0.3em] uppercase font-en">
                  Representative Director
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          03. Signature Services
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div ref={servicesRef} className="reveal max-w-[1440px] mx-auto px-6 md:px-12">

          {/* 섹션 헤더 */}
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 pb-10 border-b border-[#e8e4df] gap-8">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary mb-5 font-en">
                Expertise
              </p>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-[#1C1917] tracking-tight">
                OUR SIGNATURES
              </h2>
            </div>
            <p className="text-sm text-[#8a8480] font-light max-w-xs leading-relaxed">
              정밀한 분석과 풍부한 임상 경험을 바탕으로 만족스러운 결과를 위해 노력하는 후한의원의 주요 진료 항목입니다.
            </p>
          </div>

          {/* 서비스 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative aspect-[3/4] flex flex-col justify-between overflow-hidden bg-[#F5F3F0] border border-[#e8e4df] hover:border-primary/40 p-10 transition-all duration-500 hover:shadow-[0_16px_60px_-16px_rgba(139,115,85,0.22)]"
              >
                {/* 배경 이미지 (호버시 나타남) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-12 transition-opacity duration-700">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="block text-[9px] font-bold tracking-[0.4em] text-primary mb-5 font-en">
                    0{idx + 1}
                  </span>
                  <span className="gold-divider mb-5" />
                  <h3 className="text-xl font-bold tracking-tight text-[#1C1917] mb-2 group-hover:text-white transition-colors duration-400">
                    {service.title}
                  </h3>
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-[#b5b0aa] uppercase font-en">
                    {service.engTitle}
                  </span>
                </div>

                <div className="relative z-10">
                  <p className="text-sm text-[#8a8480] font-light mb-8 group-hover:text-white/80 transition-colors duration-400 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all">
                    {service.description}
                  </p>
                  <div className="w-10 h-10 border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-400">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          03-1. Latest Columns
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F5F3F0] overflow-hidden">
        <div ref={blogRef} className="reveal max-w-[1440px] mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-10 border-b border-[#e8e4df] gap-8">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary mb-5 font-en">
                Health Insights
              </p>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-[#1C1917] tracking-tight">
                LATEST COLUMNS
              </h2>
            </div>
            <Link
              href="/about/column"
              className="inline-flex items-center gap-3 text-[11px] font-bold text-primary tracking-[0.2em] uppercase group"
            >
              전체 칼럼 보기
              <div className="w-8 h-8 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <ArrowRight size={12} />
              </div>
            </Link>
          </div>

          <BlogPostsLimit3 />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          04. Immersive Facility
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center bg-accent overflow-hidden">
        {/* 배경 슬라이더 */}
        <div className="absolute inset-0 z-0">
          {inpatientImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[2500ms] ${
                idx === currentSlide % inpatientImages.length ? "opacity-35" : "opacity-0"
              }`}
            >
              <Image src={img} alt="입원실 시설" fill className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/75 to-accent/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent" />
        </div>

        <div ref={facilityRef} className="reveal relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24">
          <div className="max-w-2xl">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary/70 mb-8 font-en">
              Premium Ward
            </p>
            <span className="gold-divider mb-10" />
            <h2 className="text-[clamp(2.8rem,6vw,5.5rem)] text-white leading-tight tracking-tight mb-12">
              Deep Rest, <br />
              <span className="font-serif italic font-light text-primary">Private Healing</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-14">
              <div className="border-l-2 border-primary/40 pl-7 space-y-3">
                <p className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase font-en">
                  Independence
                </p>
                <p className="text-sm text-[#a09890] font-light leading-relaxed">
                  완벽하게 분리된 독립형 1인실 시스템으로 최적의 휴식을 보장합니다.
                </p>
              </div>
              <div className="border-l-2 border-primary/40 pl-7 space-y-3">
                <p className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase font-en">
                  365 Intensive
                </p>
                <p className="text-sm text-[#a09890] font-light leading-relaxed">
                  주말과 공휴일에도 끊김 없는 집중 진료 체계를 유지합니다.
                </p>
              </div>
            </div>

            <Link
              href="/clinic/traffic/room"
              className="inline-flex items-center gap-6 group"
            >
              <span className="text-[11px] font-bold tracking-[0.25em] text-white uppercase border-b border-primary/40 pb-2 group-hover:border-primary transition-all duration-300 font-en">
                Explore Facility
              </span>
              <div className="w-11 h-11 border border-white/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-400">
                <ArrowRight size={15} />
              </div>
            </Link>
          </div>
        </div>

        {/* 슬라이드 카운터 */}
        <div className="absolute bottom-10 right-10 flex items-baseline gap-3 text-white">
          <span className="text-4xl font-serif italic text-primary">
            0{(currentSlide % inpatientImages.length) + 1}
          </span>
          <span className="text-[10px] font-bold tracking-widest opacity-25 font-en">
            / 0{inpatientImages.length}
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          05. Concierge & Quick Inquiry
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div ref={visitRef} className="reveal max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

            {/* 지도 + 정보 */}
            <div className="lg:col-span-5" id="location">
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary mb-8 font-en">
                Concierge
              </p>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] mb-16 text-[#1C1917] tracking-tight uppercase">
                Visit Us
              </h2>

              <div className="space-y-12">
                {/* 지도 */}
                <div className="aspect-video w-full border border-[#e8e4df] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                  <iframe
                    src="https://maps.google.com/maps?q=후한의원%20구미점&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="후한의원 구미점 오시는 길"
                  />
                </div>

                {/* 주소 */}
                <div className="border-l-2 border-primary/30 pl-6">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-[#b5b0aa] uppercase mb-4 font-en">
                    Location
                  </p>
                  <p className="text-xl font-bold tracking-tight text-[#1C1917] mb-4 leading-snug">
                    경북 구미시 인동가산로 9-3 <br /> 노블레스타워 4층 (황상동)
                  </p>
                  <a
                    href="https://naver.me/5N15Owng"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-primary tracking-[0.15em] uppercase hover:gap-4 transition-all duration-300 font-en"
                  >
                    네이버 지도에서 보기 <ArrowRight size={12} />
                  </a>
                </div>

                {/* 진료시간 */}
                <div className="border-l-2 border-primary/30 pl-6">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-[#b5b0aa] uppercase mb-4 font-en">
                    Hours
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm border-b border-[#e8e4df] pb-2.5">
                      <span className="text-[#8a8480] font-light">평일 (야간진료)</span>
                      <span className="font-bold text-[#1C1917]">10:30 – 20:30</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-[#e8e4df] pb-2.5">
                      <span className="text-[#8a8480] font-light">토요일</span>
                      <span className="font-bold text-[#1C1917]">10:00 – 14:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-bold italic">휴진</span>
                      <span className="text-primary font-bold">일요일 / 공휴일 / 목요일</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 간편상담 폼 */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#F5F3F0] p-12 lg:p-16 border border-[#e8e4df]">
                {/* 코너 데코 */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold-line" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold-line" />

                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary mb-3 font-en">
                  Quick Inquiry
                </p>
                <h3 className="text-2xl font-bold mb-10 text-[#1C1917] tracking-tight font-serif">
                  간편 상담 신청
                </h3>
                <QuickInquiry />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
