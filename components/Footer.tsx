import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">후한의원 구미점</h3>
            <p className="text-sm text-muted mb-2">대표원장: 이언호</p>
            <p className="text-sm text-muted mb-2">주소: 경북 구미시 인동가산로 9-3 4층</p>
            <p className="text-sm text-muted">전화: 054-474-1075</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">진료시간</h3>
            <p className="text-sm text-muted mb-1 flex justify-between">
              <span>평일 (야간진료)</span>
              <span>10:30 - 20:30</span>
            </p>
            <p className="text-sm text-muted mb-1 flex justify-between">
              <span>토요일 (점심시간 없음)</span>
              <span>10:00 - 14:00</span>
            </p>            <p className="text-sm text-muted mb-1 flex justify-between font-bold">
              <span>입원실</span>
              <span>365일 운영</span>
            </p>
            <p className="text-sm text-muted mt-2 text-xs">* 목요일, 일요일, 공휴일 휴진 (입원실 제외)</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">주차안내</h3>
            <p className="text-sm text-muted mb-2">건물 내 타워주차장 이용 가능</p>
            <p className="text-sm text-muted">외부 사설 주차장 이용 시 주차권 지원 (데스크 문의)</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/admin" className="text-xs text-muted hover:text-primary transition-colors">
              © 2026 후한의원 구미점. All rights reserved.
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/for-ai" className="text-xs text-gray-400 hover:text-primary transition-colors underline decoration-dotted">
              for AI agents
            </Link>
          </div>
          <div className="flex space-x-6 text-xs text-muted">
            <button className="hover:text-primary transition-colors">이용약관</button>
            <button className="hover:text-primary font-bold transition-colors">개인정보처리방침</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
