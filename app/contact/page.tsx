import QuickInquiry from "@/components/QuickInquiry";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/30 text-white" style={{ color: 'white' }}>
            후한의원 구미점 상담 안내
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg" style={{ color: 'white' }}>
            상담 및 예약
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            편하신 방법으로 문의주시면 친절하게 안내해 드리겠습니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Inquiry Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8 border-l-4 border-accent pl-4">간편 온라인 문의</h2>
              <QuickInquiry />
              
              <div className="mt-12 p-8 bg-point-green/5 border border-point-green/20 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-point-green text-white text-[10px] font-bold rounded-full mb-3 tracking-wider">OFFLINE & ONLINE</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">다이어트 비대면 상담</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    병원 방문 없이 집에서 편하게 비대면으로<br />
                    다이어트 처방 및 상담을 받으실 수 있습니다.
                  </p>
                  <a 
                    href="https://bbs-ruddy-iota.vercel.app/diet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-point-green border-2 border-point-green font-bold py-3 px-6 rounded-2xl hover:bg-point-green hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    비대면 상담 신청하기
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-40 h-40 text-point-green" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-8 border-l-4 border-point-green pl-4">오시는 길</h2>
                <div className="bg-gray-100 rounded-2xl h-80 w-full mb-6 overflow-hidden shadow-inner border border-gray-200">
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
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-20 font-bold text-primary">주소</span>
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-700">경북 구미시 인동가산로 9-3 4층</span>
                      <a 
                        href="https://naver.me/5N15Owng" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-point-green font-bold hover:underline"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        네이버 지도로 보기 (찾아오는 길)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-20 font-bold text-primary text-sm pt-1">전화</span>
                    <span className="text-gray-700 font-medium">054-474-1075</span>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-point-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    진료시간 안내
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-bold">평일 (야간진료)</span>
                      <span>10:30 - 20:30</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-bold">토요일 (점심시간 없음)</span>
                      <span>10:00 - 14:00</span>
                    </p>                    <p className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-bold text-point-green">입원실</span>
                      <span className="text-point-green font-bold">365일 운영</span>
                    </p>
                    <p className="text-xs text-gray-400 pt-2">
                      * 점심시간: 13:00 - 14:00 (평일)<br />
                      * 목요일, 일요일, 공휴일 휴진 (입원실 제외)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 border-l-4 border-accent pl-4">주차 정보</h2>
                <div className="bg-secondary p-6 rounded-2xl border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    건물 내 <span className="font-bold text-primary">타워 주차장</span>을 무료로 이용하실 수 있습니다.<br />
                    SUV나 대형 차량 등 타워 주차장 이용이 어려운 경우, 인근 사설 주차장을 이용해 주시면 <span className="font-bold text-primary">주차권</span>을 지원해 드립니다. 데스크에 말씀해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
