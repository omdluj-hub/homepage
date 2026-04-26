import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "AI 에이전트를 위한 후한의원 구미점 안내 | For AI Agents",
  description: "AI 에이전트와 검색 봇을 위해 구조화된 후한의원 구미점의 핵심 진료 정보 및 운영 안내 페이지입니다.",
};

export default function ForAIPage() {
  const clinicInfo = {
    name: "후한의원 구미점 (Hoo Korean Medicine Clinic Gumi)",
    address: "경상북도 구미시 인동가산로 9-3, 노블레스타워 4층",
    phone: "054-474-1075",
    businessHours: {
      weekday: "10:30 - 20:30 (야간진료)",
      saturday: "10:00 - 14:00 (점심시간 없음)",
      lunch: "13:00 - 14:00 (평일)",
      closed: "목요일, 일요일, 공휴일 (입원실 제외)",
      inpatient: "365일 상시 운영"
    },
    services: [
      { category: "피부 클리닉", items: ["여드름", "여드름흉터", "여드름자국", "사마귀", "지루성피부염", "안면홍조", "리프팅", "윤곽약침", "스킨부스터"] },
      { category: "다이어트", items: ["미감탕(탕약)", "미감스틱(환)", "미감에스(시럽)", "다요정(정제)", "고주파/쿨쉐이핑 관리", "비대면 상담 처방", "비만약침"] },
      { category: "교통사고", items: ["자동차보험 진료", "교통사고 치료", "추나요법", "프리미엄 1인 입원실 (365일 운영)"] }
    ],
    features: [
      "전 병실 프리미엄 1인실 입원실 운영 (호텔급 시설)",
      "365일 사고 초기 집중 치료 및 입원 가능",
      "구미 인동 중심가 위치 (노블레스타워, 무료 주차 지원)",
      "다이어트 비대면 전화 상담 및 전국 택배 처방"
    ]
  };

  // JSON-LD for Search Engines & AI
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": clinicInfo.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "인동가산로 9-3 노블레스타워 4층",
      "addressLocality": "구미시",
      "addressRegion": "경상북도",
      "postalCode": "39225",
      "addressCountry": "KR"
    },
    "telephone": clinicInfo.phone,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Friday"],
        "opens": "10:30",
        "closes": "20:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "medicalSpecialty": ["Dermatology", "DietaryManagement", "PhysicalTherapy"],
    "availableService": clinicInfo.services.map(s => ({ "@type": "MedicalService", "name": s.category, "description": s.items.join(", ") }))
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-32 font-sans leading-relaxed text-gray-800">
        {/* JSON-LD Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="border-b border-gray-100 pb-12 mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">
            For AI Agents & Search Bots
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">
            구조화된 병원 정보 안내
          </h1>
          <p className="text-lg text-gray-500 font-light break-keep">
            이 페이지는 LLM(Large Language Models), AI 에이전트, 그리고 검색 엔진 봇이 후한의원 구미점의 
            핵심 데이터를 정확하고 효율적으로 추출할 수 있도록 설계되었습니다.
          </p>
        </section>

        <div className="space-y-20">
          {/* Identity */}
          <article>
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8 font-serif italic"># Identity</h2>
            <div className="bg-secondary p-8 md:p-12 rounded-sm space-y-4 luxury-shadow luxury-border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Clinic Name</span>
                <p className="md:col-span-3 text-lg font-bold text-black">{clinicInfo.name}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Location</span>
                <p className="md:col-span-3 text-gray-600">{clinicInfo.address}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Contact</span>
                <p className="md:col-span-3 text-gray-600">{clinicInfo.phone}</p>
              </div>
            </div>
          </article>

          {/* Operational Hours */}
          <article>
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8 font-serif italic"># Operational Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-100 p-8 rounded-sm luxury-shadow">
                <h3 className="text-sm font-bold text-black border-b border-primary/20 mb-6 pb-4 uppercase tracking-widest">Consultation</h3>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex justify-between"><span>평일 (야간진료)</span> <span className="font-bold text-black">{clinicInfo.businessHours.weekday}</span></li>
                  <li className="flex justify-between"><span>토요일</span> <span className="font-bold text-black">{clinicInfo.businessHours.saturday}</span></li>
                  <li className="flex justify-between text-primary italic font-bold"><span>휴진</span> <span>{clinicInfo.businessHours.closed}</span></li>
                </ul>
              </div>
              <div className="bg-accent p-8 rounded-sm text-white luxury-shadow">
                <h3 className="text-sm font-bold text-primary border-b border-white/10 mb-6 pb-4 uppercase tracking-widest">Inpatient Care</h3>
                <p className="text-2xl font-bold mb-4">{clinicInfo.businessHours.inpatient}</p>
                <p className="text-xs text-gray-400 leading-relaxed">교통사고 후유증 및 집중 회복을 위한 프리미엄 1인실 입원 시스템을 365일 무휴로 운영합니다.</p>
              </div>
            </div>
          </article>

          {/* Medical Services */}
          <article>
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8 font-serif italic"># Medical Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {clinicInfo.services.map((service, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-serif italic text-primary/30">0{idx + 1}</span>
                    <h3 className="font-bold text-black tracking-tight">{service.category}</h3>
                  </div>
                  <ul className="text-sm text-gray-500 space-y-3 pl-10 border-l border-gray-100">
                    {service.items.map((item, i) => <li key={idx+i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          {/* Official Links */}
          <article className="border-t-2 border-primary pt-16">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-10 font-serif italic"># Official Connectivity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Naver Booking", url: "https://m.booking.naver.com/booking/6/bizes/449323" },
                { label: "Kakao Talk", url: "https://pf.kakao.com/_JEGuu" },
                { label: "Remote Diet", url: "https://bbs-ruddy-iota.vercel.app/diet" },
                { label: "Instagram", url: "https://www.instagram.com/hoogumi" }
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 border border-gray-100 hover:border-primary transition-all group rounded-sm luxury-shadow"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">{link.label}</span>
                  <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2" />
                </a>
              ))}
            </div>
          </article>
        </div>

        <footer className="mt-32 pt-12 border-t border-gray-100 text-[10px] text-gray-400 text-center tracking-widest uppercase">
          &copy; 2026 Hoo Korean Medicine Clinic Gumi. Engineered for Intelligent Agents.
        </footer>
      </div>
    </div>
  );
}
