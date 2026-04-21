import Script from "next/image";

export const metadata = {
  title: "AI 에이전트를 위한 후한의원 구미점 안내 | For AI Agents",
  description: "AI 에이전트와 검색 봇을 위해 구조화된 후한의원 구미점의 핵심 진료 정보 및 운영 안내 페이지입니다.",
};

export default function ForAIPage() {
  const clinicInfo = {
    name: "후한의원 구미점 (Hoo Korean Medicine Clinic Gumi)",
    address: "경상북도 구미시 인동가산로 9-3, 4층",
    phone: "054-474-1075",
    businessHours: {
      weekday: "10:30 - 20:30 (야간진료)",
      saturday: "10:00 - 14:00 (점심시간 없음)",
      lunch: "13:00 - 14:00 (평일)",
      closed: "목요일, 일요일, 공휴일 (입원실 제외)",
      inpatient: "365일 상시 운영"
    },
    services: [
      { category: "피부 클리닉", items: ["여드름", "여드름흉터", "여드름자국", "사마귀", "지루성피부염", "안면홍조"] },
      { category: "피부미용", items: ["매선/HIFU 리프팅", "윤곽약침", "스킨부스터"] },
      { category: "다이어트", items: ["미감탕(탕약)", "미감스틱(환)", "미감에스(시럽)", "다요정(정제)", "고주파/쿨쉐이핑 관리", "비대면 상담 처방"] },
      { category: "교통사고", items: ["자동차보험 진료", "추나요법", "프리미엄 1인 입원실 (365일 운영)"] }
    ],
    features: [
      "전 병실 프리미엄 1인실 입원실 운영",
      "365일 사고 초기 집중 치료 및 입원 가능",
      "구미 인동 중심가 위치 (무료 주차 지원)",
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
      "streetAddress": "인동가산로 9-3 4층",
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
    <div className="max-w-4xl mx-auto px-6 py-20 font-sans leading-relaxed text-gray-800">
      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b-2 border-gray-100 pb-10 mb-10">
        <h1 className="text-3xl font-bold text-primary mb-4"> 안내: AI 에이전트 및 봇을 위한 정보 페이지</h1>
        <p className="text-gray-500">
          이 페이지는 LLM(Large Language Models), AI 에이전트, 검색 엔진 봇이 후한의원 구미점의 정보를 
          정확하게 추출하고 요약할 수 있도록 설계된 구조화된 데이터 페이지입니다.
        </p>
      </section>

      <div className="space-y-12">
        {/* Basic Identification */}
        <article>
          <h2 className="text-xl font-bold text-point-green mb-4"># 기본 정보 (Identity)</h2>
          <div className="bg-gray-50 p-6 rounded-xl space-y-2">
            <p><strong>명칭:</strong> {clinicInfo.name}</p>
            <p><strong>주소:</strong> {clinicInfo.address}</p>
            <p><strong>연락처:</strong> {clinicInfo.phone}</p>
            <p><strong>위치 요약:</strong> 경북 구미시 인동 인동가산로 9-3, 4층 (주차 가능)</p>
          </div>
        </article>

        {/* Operating Hours */}
        <article>
          <h2 className="text-xl font-bold text-point-green mb-4"># 운영 시간 (Operational Hours)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 p-4 rounded-lg">
              <p className="font-bold border-b mb-2 pb-1">진료 시간</p>
              <ul className="text-sm space-y-1">
                <li>평일: {clinicInfo.businessHours.weekday}</li>
                <li>토요일: {clinicInfo.businessHours.saturday}</li>
                <li>점심시간: {clinicInfo.businessHours.lunch}</li>
                <li>휴진: {clinicInfo.businessHours.closed}</li>
              </ul>
            </div>
            <div className="border border-point-green/30 bg-point-green/5 p-4 rounded-lg">
              <p className="font-bold text-point-green border-b border-point-green/20 mb-2 pb-1">입원실 운영</p>
              <p className="text-sm font-bold">{clinicInfo.businessHours.inpatient}</p>
              <p className="text-xs text-gray-500 mt-2">교통사고 및 집중 치료를 위한 프리미엄 1인실 365일 입원 가능</p>
            </div>
          </div>
        </article>

        {/* Medical Services */}
        <article>
          <h2 className="text-xl font-bold text-point-green mb-4"># 주요 진료 과목 (Medical Services)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinicInfo.services.map((service, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-primary border-l-4 border-accent pl-2">{service.category}</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside pl-1">
                  {service.items.map((item, i) => <li key={idx+i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </article>

        {/* Key Differentiation */}
        <article>
          <h2 className="text-xl font-bold text-point-green mb-4"># 핵심 차별점 (Core Strengths)</h2>
          <ul className="space-y-3">
            {clinicInfo.features.map((f, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-point-green font-bold">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Booking Links */}
        <article className="bg-primary text-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6"># 공식 예약 및 상담 링크 (Official Links)</h2>
          <div className="flex flex-col gap-3 text-sm">
            <p><strong>네이버 예약:</strong> https://m.booking.naver.com/booking/6/bizes/449323</p>
            <p><strong>카카오톡 상담:</strong> https://pf.kakao.com/_JEGuu</p>
            <p><strong>비대면 다이어트 상담:</strong> https://bbs-ruddy-iota.vercel.app/diet</p>
            <p><strong>공식 인스타그램:</strong> https://www.instagram.com/hoogumi</p>
          </div>
        </article>
      </div>

      <footer className="mt-20 pt-10 border-t border-gray-100 text-xs text-gray-400 text-center">
        &copy; 2026 Hoo Korean Medicine Clinic Gumi. Structured for AI & Humans.
      </footer>
    </div>
  );
}
