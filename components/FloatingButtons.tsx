"use client";

import { MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* Naver Reservation Button */}
      <a
        href="https://m.booking.naver.com/booking/6/bizes/449323"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#03C75A] text-white rounded-none shadow-2xl hover:-translate-y-1 transition-luxury"
        title="네이버 예약"
      >
        <span className="font-black text-[10px] leading-tight text-center uppercase tracking-tighter">Naver<br/>Booking</span>
      </a>

      {/* Kakao Consultation Button */}
      <a
        href="https://pf.kakao.com/_JEGuu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#FEE500] text-[#3c1e1e] rounded-none shadow-2xl hover:-translate-y-1 transition-luxury"
        title="카카오톡 상담"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.27 6.054l-.841 3.08c-.052.193.06.393.25.464.064.024.133.036.202.036.138 0 .272-.053.37-.153l3.622-3.622c.367.043.743.066 1.127.066 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingButtons;
