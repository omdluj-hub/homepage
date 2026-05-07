"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { ArrowRight } from "lucide-react";

// 숫자를 감지하여 크기를 키우고 가독성을 높이는 헬퍼 함수
const formatText = (text: string) => {
  if (!text) return text;
  return text.split(/(\d+)/).map((part, i) => 
    /\d+/.test(part) ? (
      <span key={i} className="font-sans inline-block translate-y-[-0.02em]" style={{ fontVariantNumeric: 'lining-nums' }}>
        {part}
      </span>
    ) : part
  );
};

const CLINIC_DATA: Record<string, any> = {
  // 피부 클리닉
  "skin": {
    title: "피부 클리닉",
    subtitle: "속부터 다스려 겉으로 드러나는 아름다움을 완성합니다",
    description: "피부 문제는 단순한 외벽의 손상이 아닌, 몸속 오장육부의 불균형과 기혈 순환의 정체에서 비롯됩니다. 후한의원은 겉도는 치료가 아닌, 체내 독소를 제거하고 무너진 피부 장벽을 재건하여 피부 본연의 자생력을 회복시키는 근본 치료를 지향합니다.",
    image: "/images/상담.jpg",
    features: [
      { title: "체질별 맞춤 처방", desc: "개인별 장부 상태를 파악하여 피부 열감을 내리고 해독을 돕는 한약 처방" },
      { title: "정교한 외치 요법", desc: "한방 팩, 약침, 광선 치료를 통해 환부의 염증을 즉각적으로 진정" }
    ],
  },
  "skin/acne": { 
    title: "여드름", 
    subtitle: "반복되는 여드름의 고리, 피지선 정상화와 내부 원인 개선으로 끊어냅니다", 
    description: "여드름은 단순한 피부 표면의 문제가 아니라 체내 열 상충 증상과 각질 탈락 주기의 이상이 결합된 결과입니다. 후한의원 구미점은 정교한 압출로 씨앗을 제거함과 동시에, 한방 필링으로 모공 통로를 확보하고 맞춤 한약을 통해 내부의 열독을 다스려 재발률을 낮추는 입체적인 치료를 시행합니다.", 
    image: "/images/clinic/여드름.jpg", 
    features: [
      { title: "정교한 압출 시스템", desc: "숙련된 의료진의 정밀 압출로 주변 조직 손상을 최소화하고 염증 확산을 방지합니다." },
      { title: "홈케어 맞춤 코칭", desc: "개인별 피부 타입에 맞는 외용제 처방과 생활 습관 가이드로 치료 효과를 유지합니다." },
      { title: "재발 방지 한약", desc: "피지 분비를 조절하고 몸속 불균형을 바로잡아 여드름이 잘 생기지 않는 환경을 만듭니다." }
    ] 
  },
  "skin/scar": { 
    title: "여드름흉터", 
    subtitle: "멈춰버린 피부 재생 시간, 후한의원만의 특수 침법으로 다시 깨워드립니다", 
    description: "함몰된 흉터 조직은 이미 재생이 멈춘 상태입니다. 후한의원의 '트랜스테라피'와 '엠톤' 시술은 유착된 흉터 하부 조직을 정교하게 끊어내고 새살이 차오를 수 있는 공간과 자극을 부여합니다. 인위적인 채움이 아닌 내 살이 직접 차오르는 방식이기에 치료 후에도 유지력이 뛰어납니다.", 
    image: "/images/clinic/여드름흉터.jpg", 
    features: [
      { title: "흉터 하부 복원", desc: "단단하게 굳은 흉터 바닥면의 유착을 끊어 재생 세포의 활동을 유도합니다." },
      { title: "피부 결 정돈", desc: "차오른 새살이 주변 피부와 조화롭게 어우러지도록 정밀하게 결을 교정합니다." },
      { title: "맞춤형 복합 치료", desc: "박스형, 송곳형, 라운드형 등 흉터 모양에 따라 최적화된 시술을 병행합니다." }
    ] 
  },
  "skin/mark": { 
    title: "여드름자국", 
    subtitle: "붉고 어두운 흔적을 지우고 투명하고 맑은 안색을 되찾아드립니다", 
    description: "염증 후 과색소 침착(PIH)으로 남은 자국은 혈액 순환과 세포 재생 속도에 따라 회복 속도가 다릅니다. 후한의원 구미점은 한방 약침과 재생 침 요법을 통해 환부의 순환을 촉진하고 색소 배출을 도와, 자연 회복보다 훨씬 짧은 기간 내에 깨끗하고 고른 피부톤으로 개선합니다.", 
    image: "/images/clinic/여드름자국.JPG", 
    features: [
      { title: "색소 배출 촉진", desc: "침착된 멜라닌 색소의 자연스러운 탈락을 유도하여 칙칙한 자국을 지웁니다." },
      { title: "붉은기 진정 케어", desc: "확장된 모세혈관을 안정시키고 염증 후 남은 붉은 흔적을 집중적으로 관리합니다." },
      { title: "피부 자생력 강화", desc: "미세 순환을 원활하게 하여 피부 본연의 재생 주기를 정상화합니다." }
    ] 
  },
  "skin/wart": { 
    title: "사마귀", 
    subtitle: "바이러스 질환, 면역력이 근본적인 답입니다", 
    description: "사마귀는 인유두종 바이러스(HPV) 감염 질환으로, 단순히 겉으로 보이는 병변만 제거하면 다시 번지기 쉽습니다. 몸의 면역 체계를 강화하여 바이러스를 스스로 이겨낼 수 있게 만드는 '면역 한약'과 병변을 직접 탈락시키는 '환부 집중 치료'를 병행하여 호전을 목표로 합니다.", 
    image: "/images/clinic/사마귀.jpg", 
    features: [
      { title: "면역 체계 재건", desc: "개인별 맞춤 한약으로 바이러스에 대항하는 신체 자생력을 증강시킵니다." },
      { title: "무통 한방 제거", desc: "뜸과 약침을 활용하여 주변 조직 손상 걱정 없이 병변을 제거합니다." },
      { title: "전염 확산 차단", desc: "체계적인 관리를 통해 주변 부위로의 전염과 가족 간 감염을 방지합니다." }
    ] 
  },
  "skin/seborrheic": { 
    title: "지루성/주사피부염", 
    subtitle: "예민해진 피부 장벽, 근본 원인부터 다스려 다시 세웁니다", 
    description: "가려움, 따가움, 홍조를 동반하는 지루성 피부염은 만성 염증성 질환입니다. 후한의원은 스테로이드 사용으로 얇아진 피부 장벽을 회복시키고, 상체로 쏠린 열을 내리는 '수승화강' 원리를 통해 피부 환경을 정화하여 만성적인 염증의 고리를 끊어냅니다.", 
    image: "/images/clinic/지루성피부염.jpg", 
    features: [
      { title: "상열감 해소 치료", desc: "얼굴과 두피로 몰리는 비정상적인 열감을 가라앉혀 염증 반응을 진정시킵니다." },
      { title: "피부 장벽 재건", desc: "외부 자극에 민감하게 반응하지 않도록 탄탄한 피부 보호막 형성을 돕습니다." },
      { title: "면역 밸런스 조절", desc: "과민해진 면역 반응을 정상화하여 재발 없는 피부 안정을 추구합니다." }
    ] 
  },
  "skin/rosacea": { 
    title: "안면홍조", 
    subtitle: "시도 때도 없이 붉어지는 얼굴, 혈관의 안정과 마음의 여유를 찾아드립니다", 
    description: "감정 변화나 온도 차에 민감하게 반응하는 홍조는 혈관 조절력 저하와 자율신경계 불균형이 주된 원인입니다. 심장의 열을 내리고 확장된 혈관의 수축력을 높이는 기혈 순환 치료를 통해 과민해진 피부 혈관을 안정시키고 맑고 건강한 안색을 유지하게 돕습니다.", 
    image: "/images/clinic/홍조.jpg", 
    features: [
      { title: "혈관 수축력 강화", desc: "특수 약침 요법으로 확장된 모세혈관을 안정시키고 탄력을 회복시킵니다." },
      { title: "자율신경계 조절", desc: "긴장과 스트레스로 인한 상열감을 다스려 심신의 안정을 도모합니다." },
      { title: "열 순환 장애 개선", desc: "전신 기혈 순환을 원활하게 하여 얼굴로만 집중되는 열 분산을 돕습니다." }
    ] 
  },

  // 피부미용
  "beauty": { 
    title: "피부미용 클리닉", 
    subtitle: "인위적이지 않은 자연스러운 아름다움", 
    description: "나이가 들며 무너지는 얼굴 라인과 탄력, 후한의원 구미점은 자연에서 온 한방 성분과 경혈 자극을 통해 본연의 아름다움을 깨웁니다. 화학 물질에 대한 거부감 없이, 내 몸의 재생 기능을 극대화하여 건강하게 젊어지는 시간을 선사합니다.", 
    image: "/images/clinic/리프팅.jpg", 
    features: [
      { title: "무너진 라인 교정", desc: "중력으로 처진 근육층을 자극하여 즉각적인 리프팅 효과" },
      { title: "피부톤 광채 재생", desc: "기혈 순환 촉진으로 속부터 차오르는 맑은 피부" }
    ] 
  },
  "beauty/lifting": { 
    title: "리프팅 클리닉", 
    subtitle: "매선과 HIFU의 조화, 입체적인 탄력을 완성합니다", 
    description: "처진 얼굴 라인을 바로잡기 위해 후한의원 구미점은 두 가지 핵심 솔루션을 제안합니다. 전통 한방 기술인 '매선 요법'으로 피부 속 지지층을 탄탄하게 재건하고, 현대적 기술인 'HIFU(초음파) 리프팅'으로 깊은 근막층까지 수축시켜 겉과 속이 모두 탄탄한 입체적인 리프팅 효과를 선사합니다.", 
    image: "/images/clinic/리프팅.jpg", 
    features: [
      { title: "매선 요법 (실 리프팅)", desc: "PDO 녹는 실로 콜라겐 생성을 유도하고 피부 조직을 견인" },
      { title: "HIFU 초음파 리프팅", desc: "고강도 집속 초음파로 SMAS층까지 에너지를 전달하여 탄력 개선" },
      { title: "개인별 맞춤 디자인", desc: "노화 정도와 얼굴형에 따른 정교한 1:1 맞춤 시술" }
    ] 
  },
  "beauty/contour": { 
    title: "윤곽약침", 
    subtitle: "불필요한 지방은 덜어내고 숨겨진 라인을 찾습니다", 
    description: "한방 천연 생약 성분을 활용한 윤곽약침은 얼굴의 붓기와 지방 분해를 동시에 돕습니다. 림프 순환을 촉진하여 노폐물을 배출시키고, 비대해진 지방 세포를 축소시켜 수술 없이도 갸름하고 매끄러운 얼굴형을 완성합니다.", 
    image: "/images/clinic/윤곽약침.jpg", 
    features: [
      { title: "천연 생약 분해", desc: "안전을 고려한 한방 성분의 지방 분해 효과" },
      { title: "림프 순환 촉진", desc: "정체된 순환을 깨워 얼굴 부종 및 독소 제거" }
    ] 
  },
  "beauty/skin-booster": { 
    title: "스킨부스터", 
    subtitle: "피부 깊숙이 채우는 고농축 영양 에너지", 
    description: "지치고 메마른 피부에 직접적으로 영양을 공급합니다. 한방 보습 인자와 재생 성분을 담은 부스터를 피부 진피층 근처까지 전달하여 수분감 충전은 물론 미세 주름 개선과 피부 결 개선 효과를 즉각적으로 체감하실 수 있습니다.", 
    image: "/images/clinic/스킨부스터.png", 
    features: [
      { title: "즉각적 수분 충전", desc: "푸석한 피부에 생기를 불어넣는 딥 하이드레이션" },
      { title: "세포 재생 가속", desc: "손상된 피부 세포의 회복을 돕는 영양 공급" }
    ] 
  },

  // 다이어트
  "diet": { 
    title: "다이어트 클리닉", 
    subtitle: "단순한 체중 감량을 넘어 체질의 변화를 꿈꿉니다", 
    description: "굶어서 빼는 다이어트는 결국 요요를 부릅니다. 후한의원은 살이 찌는 근본 원인을 분석하여 기초 대사량을 높이고 체지방 위주의 감량을 유도합니다. 몸의 기력을 보강하면서 진행하기에 지치지 않고 건강하게 목표 체중에 도달할 수 있습니다.", 
    image: "/images/clinic/다이어트 관리.JPG", 
    features: [
      { title: "체질별 정밀 진단", desc: "비만의 원인이 되는 장부 불균형과 생활 습관 분석" },
      { title: "요요 방지 시스템", desc: "감량 후 체중을 고착화시키는 꼼꼼한 유지기 관리" }
    ] 
  },
  "diet/medicine": { 
    title: "다이어트 한약", 
    subtitle: "단순한 억제가 아닌, 내 몸의 대사를 깨우는 건강한 다이어트의 시작", 
    description: "후한의원의 다이어트 한약은 단순히 식욕을 억제하는 데 그치지 않습니다. 1:1 정밀 체질 진단을 통해 기초 대사량을 활성화하고, 체내 독소 배출과 부종 개선을 도와 요요 적은 감량을 목표로 합니다. 개인의 몸 상태에 가장 최적화된 처방으로 기력 저하 없이 건강하게 아름다워지는 시간을 경험하세요.", 
    images: ["/images/미감탕.JPG", "/images/다요스틱.JPG", "/images/미감에스.jpg", "/images/다요정.jpg"], 
    features: [
      { title: "1:1 맞춤형 정밀 처방", desc: "획일적인 조제가 아닌 개인의 체질, 목표 감량치, 평소 건강 상태를 분석하여 오직 나만을 위한 한약을 조제합니다." },
      { title: "에너지 대사 및 지방 연소 활성화", desc: "체내 대사량을 끌어올려 운동 효율을 극대화하고, 에너지를 스스로 소모하기 쉬운 몸의 환경을 만듭니다." },
      { title: "자연스러운 포만감과 허기 조절", desc: "무리하게 굶지 않아도 자연스럽게 식사량을 조절할 수 있도록 도와주며, 다이어트 중 발생하는 스트레스를 완화합니다." },
      { title: "라이프스타일에 맞춘 다양한 제제", desc: "고농축 맞춤 탕약부터 휴대하기 편한 미감스틱(환), 간편한 다요정(알약), 복용이 즐거운 시럽형까지 선택이 가능합니다." }
    ] 
  },
  "diet/program": { 
    title: "다이어트 관리", 
    subtitle: "고주파, 왕뜸, 쿨쉐이핑으로 완성하는 체계적인 체형 관리", 
    description: "단순한 체중 감량을 넘어 탄력 있는 몸매와 원활한 신진대사를 위해 고주파, 왕뜸, 쿨쉐이핑 등 다양한 보조 요법을 병행합니다. 지방 분해를 촉진하고 부종을 개선하여 더욱 건강하고 아름다운 라인을 만들어 드립니다.", 
    image: "/images/clinic/다이어트 관리.JPG", 
    features: [
      { title: "고주파 관리", desc: "심부열을 발생시켜 지방 분해를 촉진하고 피부 탄력을 개선하여 매끄러운 라인을 만듭니다." },
      { title: "심부 왕뜸 요법", desc: "복부의 온기를 더해 신진대사를 활성화하고 내장 지방 분해 및 소화 기능 개선을 돕습니다." },
      { title: "쿨쉐이핑 (냉동지방분해)", desc: "지방 세포만을 선택적으로 냉각하여 자연스러운 지방 감소를 유도하는 비침습적 체형 교정입니다." },
      { title: "체계적인 밀착 케어", desc: "주기적인 인바디 검사와 식단 피드백으로 감량 목표 달성을 끝까지 함께합니다." }
    ] 
  },
  "diet/point": { 
    title: "비만약침", 
    subtitle: "빠지지 않는 한 부위, 국소 부위 타격 해결사", 
    description: "전신 감량만으로는 해결되지 않는 복부, 팔뚝, 허벅지 등 특정 부위의 지방층에 직접 약침을 시술합니다. 지방 분해를 촉진하는 한방 추출물을 주입하여 셀룰라이트를 정리하고 국소 부위 사이즈 감소를 통해 아름다운 바디 라인을 디자인합니다.", 
    images: ["/images/clinic/비만약침1.jpg", "/images/clinic/비만약침2.jpg"], 
    features: [
      { title: "국소 지방 분해", desc: "운동으로 빼기 힘든 부위의 지방 세포 집중 공격" },
      { title: "탄력 저하 예방", desc: "감량 후 발생할 수 있는 피부 처짐 방지 및 탄력 강화" }
    ] 
  },
  "diet/remote": { 
    title: "비대면 상담", 
    subtitle: "전국 어디서나, 병원 방문 없이 편리한 진료", 
    description: "바쁜 직장인이나 거리상의 문제로 내원이 어려운 분들을 위해 '비대면 진료'를 운영합니다. 전화 혹은 화상 상담을 통해 원장님이 직접 상태를 파악하고 맞춤 한약을 처방해 드리며, 택배를 통해 집 앞까지 안전하게 배송해 드립니다.", 
    image: "/images/비대면처방.jpg", 
    features: [
      { title: "전화 진료 시스템", desc: "상세 문진표 작성 후 진행되는 심도 있는 상담" },
      { title: "안전 비대면 처방", desc: "병원에 오지 않아도 동일한 수준의 맞춤 한약 제공" }
    ],
    cta: { title: "비대면 상담 신청하기", href: "https://bbs-ruddy-iota.vercel.app/diet" }
  },

  // 교통사고
  "traffic": { 
    title: "교통사고 클리닉", 
    subtitle: "사고보다 무서운 후유증, 초기 집중 치료가 정답입니다", 
    description: "사고 직후 엑스레이에 나타나지 않는 통증은 몸속 '어혈(瘀血)' 때문입니다. 후한의원 구미점은 어혈을 빠르게 제거하고 놀란 근육과 신경을 안정시키는 복합 한방 진료를 시행합니다. 365일 운영되는 입원실에서 사고 초기 충분한 휴식과 치료를 받으실 수 있습니다.", 
    image: "/images/인바디검사.jpg", 
    features: [
      { title: "365일 야간·주말 진료", desc: "사고 당일 즉시 시작하는 골든타임 치료" },
      { title: "자동차보험 적용", desc: "환자 부담금 없이 치료와 입원에 전념 가능" }
    ] 
  },
  "traffic/info": { 
    title: "교통사고 접수 및 관리", 
    subtitle: "복잡한 절차 걱정 없이, 오직 회복에만 전념하세요", 
    description: "교통사고 후유증 치료, 시작부터 끝까지 후한의원이 함께합니다. 사고 접수번호만 알려주시면 진료비 지불 보증 확인부터 보험사 연락까지 모든 행정 절차를 병원에서 직접 처리해 드립니다. 환자분은 본인부담금 없이 정성 어린 진료를 받으실 수 있습니다.", 
    image: "/images/traffic-info.png", 
    features: [
      { title: "본인부담금 0원", desc: "자동차보험 적용 시, 침·약침·추나·한약 등 모든 한방 치료를 본인 부담금 없이 받으실 수 있습니다." },
      { title: "간편한 접수 시스템", desc: "대인사고 접수번호와 담당자 연락처만 알려주시면 나머지 모든 과정은 병원에서 대행합니다." },
      { title: "입원 & 통원 맞춤 치료", desc: "환자분의 증상에 따라 365일 운영되는 쾌적한 1인 입원실 집중 치료와 세심한 통원 치료 중 선택 가능합니다." },
      { title: "1:1 맞춤 상담 지원", desc: "단순 통증 치료를 넘어 향후 치료 계획, 후유증 예방, 보상 관련 절차 등 궁금하신 점을 상세히 상담해 드립니다." }
    ] 
  },
  "traffic/treatment": { 
    title: "교통사고 치료", 
    subtitle: "체계적인 단계별 치료로 후유증의 뿌리까지 해결합니다", 
    description: "단순한 통증 완화를 넘어, 사고 충격으로 흐트러진 신체 밸런스를 바로잡고 신경계의 안정을 도모합니다. 후한의원 구미점은 환자 개개인의 손상 부위와 증상 정도에 따라 침, 약침, 부항, 추나 등 최적의 한방 복합 솔루션을 제공하여 빠른 일상 복귀를 지원합니다.", 
    image: "/images/clinic/서류.jpg", 
    features: [
      { title: "맞춤 한약 처방", desc: "사고 충격으로 정체된 미세 혈류를 개선하고, 체내 염증 물질 배출을 촉진하여 빠른 조직 회복을 돕습니다." },
      { title: "약침 및 침 치료", desc: "손상된 근육과 인대의 염증을 직접적으로 제어하고, 긴장된 신경을 이완시켜 통증을 효과적으로 관리합니다." },
      { title: "심신 안정 케어", desc: "사고 후 동반될 수 있는 외상 후 스트레스, 불면, 불안 증상까지 세심하게 살펴 심신의 안정을 돕습니다." },
      { title: "한방 물리요법", desc: "온열 요법과 전기 자극 치료 등을 병행하여 혈액 순환을 활성화하고 손상 부위의 재생을 가속화합니다." }
    ] 
  },
  "traffic/chuna": { 
    title: "추나요법", 
    subtitle: "한의사의 정교한 수기 치료로 신체의 구조적·기능적 문제를 해결합니다", 
    description: "추나요법은 한의사가 손 또는 신체 일부분을 사용하여 환자의 틀어진 골격 관절을 바로잡고, 경직된 근육과 인대를 이완시키는 한방 수기 요법입니다. 특히 교통사고와 같은 강한 충격으로 인한 미세한 정렬 불균형은 만성 후유증의 원인이 되는데, 추나 치료는 이를 근본적으로 교정하여 통증을 해소하고 전신 기혈 순환을 활성화합니다.", 
    image: "/images/clinic/자보.jpg", 
    features: [
      { title: "관절 및 골격 교정", desc: "비정상적으로 틀어진 척추와 관절의 위치를 정렬하여 신경 압박을 해소하고 신체 밸런스를 회복합니다." },
      { title: "연부 조직 이완", desc: "긴장되고 딱딱하게 굳은 근육, 인대, 근막을 세밀하게 풀어내어 혈액 순환을 촉진하고 통증을 완화합니다." },
      { title: "맞춤형 기법 적용", desc: "환자의 체형, 통증 부위, 증상 정도에 따라 정골 추나, 경근 추나 등 최적화된 기법을 선택하여 시행합니다." },
      { title: "자동차보험 적용", desc: "교통사고로 인한 추나 치료는 자동차보험 범주 내에서 본인 부담금 없이 체계적인 교정을 받으실 수 있습니다." }
    ] 
  },
  "traffic/room": { 
    title: "프리미엄 1인 입원실", 
    subtitle: "365일 집중 치료를 위한 호텔급 시설", 
    description: "사고 직후의 통증과 심리적 불안까지 세심하게 케어해 드립니다. 전 병실 1인실 구성으로 타인의 시선에서 자유로운 완벽한 휴식을 보장하며, 최신형 모션베드와 개별 냉난방 시스템 및 TV, 냉장고 등 호텔급 편의 시설이 완비되어 오직 치료에만 전념하실 수 있습니다.", 
    image: "/images/inpatient/KakaoTalk_20230131_100612554.jpg",
    gallery: [
      "/images/inpatient/KakaoTalk_20230131_100611036.jpg",
      "/images/inpatient/KakaoTalk_20230131_100621199.jpg",
      "/images/inpatient/KakaoTalk_20230131_100622250.jpg",
      "/images/inpatient/KakaoTalk_20230131_100624110.jpg",
    ],
    features: [
      { title: "전 병실 1인실 구성", desc: "감염 걱정 없고 조용한 독립된 회복 공간" },
      { title: "최신형 모션베드 도입", desc: "상하체 각도 조절로 가장 편안한 회복 자세 제공" },
      { title: "개별 냉난방 완비", desc: "나에게 최적화된 온도로 쾌적한 입원 생활" },
      { title: "하루 2회 집중 진료", desc: "입원 기간 동안 한의사의 집중 케어 프로그램" },
      { title: "맞춤 영양 식단", desc: "회복을 돕는 정성스럽고 건강한 한방 식사" },
    ] 
  },
};

const MENU_STRUCTURE = [
  { 
    name: "피부 클리닉", 
    path: "skin",
    subMenus: [
      { name: "여드름", href: "/clinic/skin/acne" },
      { name: "여드름흉터", href: "/clinic/skin/scar" },
      { name: "여드름자국", href: "/clinic/skin/mark" },
      { name: "사마귀", href: "/clinic/skin/wart" },
      { name: "지루성/주사피부염", href: "/clinic/skin/seborrheic" },
      { name: "안면홍조", href: "/clinic/skin/rosacea" },
      { name: "리프팅", href: "/clinic/beauty/lifting" },
      { name: "윤곽약침", href: "/clinic/beauty/contour" },
      { name: "스킨부스터", href: "/clinic/beauty/skin-booster" },
    ]
  },
  { 
    name: "다이어트", 
    path: "diet",
    subMenus: [
      { name: "다이어트 한약", href: "/clinic/diet/medicine" },
      { name: "다이어트 관리", href: "/clinic/diet/program" },
      { name: "비만약침", href: "/clinic/diet/point" },
      { name: "비대면 상담", href: "/clinic/diet/remote" },
    ]
  },
  { 
    name: "교통사고", 
    path: "traffic",
    subMenus: [
      { name: "접수 및 절차", href: "/clinic/traffic/info" },
      { name: "교통사고 치료", href: "/clinic/traffic/treatment" },
      { name: "추나요법", href: "/clinic/traffic/chuna" },
      { name: "프리미엄 입원실", href: "/clinic/traffic/room" },
    ]
  },
];

export default function ClinicDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const unwrappedParams = use(params);
  const fullPath = unwrappedParams.slug.join('/');
  const category = unwrappedParams.slug[0];
  const data = CLINIC_DATA[fullPath];
  
  const currentCategory = MENU_STRUCTURE.find(m => m.path === (category === 'beauty' ? 'skin' : category));
  const subMenus = currentCategory?.subMenus || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImageSlide, setMainImageSlide] = useState(0);

  useEffect(() => {
    const imagesToSlide = data?.gallery || data?.images;
    if (imagesToSlide && imagesToSlide.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % imagesToSlide.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [data?.gallery, data?.images]);

  useEffect(() => {
    if (data?.images && data.images.length > 1) {
      const timer = setInterval(() => {
        setMainImageSlide((prev) => (prev + 1) % data.images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [data?.images]);

  if (!data) notFound();

  return (
    <div className="flex flex-col bg-white pt-[110px] md:pt-[120px]">
      {/* Sub Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-[80px] md:top-[90px] z-40 overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-center min-w-max gap-8 md:gap-12">
            {subMenus.map((menu: any) => {
              const isActive = `/clinic/${fullPath}` === menu.href;
              return (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`px-0 py-5 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase transition-all border-b-2 ${
                    isActive 
                    ? "border-primary text-primary" 
                    : "border-transparent text-gray-400 hover:text-black"
                  }`}
                >
                  <span className="font-sans">{menu.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Clinic Header */}
      <section className="bg-secondary py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 text-center animate-fade-in-up">
          <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8">
            Treatment Program
          </span>
          <h1 className="text-4xl md:text-6xl text-black mb-8 tracking-tight uppercase font-sans font-bold">
            {formatText(data.title)}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-gray-500 break-keep">
            {formatText(data.subtitle)}
          </p>
        </div>
      </section>

      {fullPath === 'traffic/room' ? (
        /* --- PREMIUM WARD: Original Ratio Side-by-side Slider --- */
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              <div className="w-full lg:w-1/2 order-2 lg:order-1 sticky top-40">
                <div className="grid luxury-shadow luxury-border bg-white rounded-sm overflow-hidden">
                  {data.gallery.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className={`col-start-1 row-start-1 transition-all duration-[1000ms] ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`${data.title} ${idx + 1}`} className="w-full h-auto block" />
                    </div>
                  ))}
                  <div className="col-start-1 row-start-1 self-end justify-self-center mb-6 flex gap-2 z-20">
                    {data.gallery.map((_: any, idx: number) => (
                      <div key={idx} className={`h-1 transition-all ${idx === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="mb-16">
                  <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8 font-serif italic">Overview</h2>
                  <p className="text-base md:text-lg text-black font-light leading-relaxed mb-12 break-keep">{formatText(data.description)}</p>
                </div>
                <div className="space-y-12 break-keep">
                  <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary font-serif italic">Key Features</h2>
                  {data.features.map((feature: any, idx: number) => (
                    <div key={idx} className="flex gap-8 group">
                      <span className="text-3xl font-serif italic text-primary/20 group-hover:text-primary transition-all">0{idx + 1}</span>
                      <div className="pt-1">
                        <h3 className="text-lg font-bold text-black mb-3 tracking-tight font-sans">{formatText(feature.title)}</h3>
                        <p className="text-base text-gray-500 font-light leading-relaxed">{formatText(feature.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* --- ALL OTHER PAGES --- */
        <>
          <section className="py-24 md:py-32 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex flex-col lg:flex-row gap-24 items-start">
                <div className="lg:w-1/2 sticky top-40">
                  <div className="luxury-shadow luxury-border bg-white rounded-sm overflow-hidden w-full">
                    {data.images ? (
                      <div className="grid">
                        {data.images.map((img: string, idx: number) => (
                          <div 
                            key={idx} 
                            className={`col-start-1 row-start-1 transition-all duration-1000 ${idx === mainImageSlide ? 'opacity-100' : 'opacity-0'}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt={`${data.title} ${idx + 1}`} className="w-full h-auto block" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={data.image} alt={data.title} className="w-full h-auto block" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="mb-20">
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8">Overview</h2>
                    <p className="text-base md:text-lg text-black font-light leading-relaxed mb-12 break-keep font-sans">{formatText(data.description)}</p>

                  </div>
                  <div className="space-y-16 break-keep">
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-primary">Key Features</h2>
                    {data.features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex gap-12 group">
                        <span className="text-3xl font-sans font-bold text-primary/20 group-hover:text-primary transition-all">0{idx + 1}</span>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold text-black mb-4 tracking-tight font-sans">{formatText(feature.title)}</h3>
                          <p className="text-base text-gray-500 font-light leading-relaxed">{formatText(feature.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {data.cta && (
                    <div className="mt-24 pt-12 border-t border-gray-100">
                      <Link
                        href={data.cta.href}
                        target={data.cta.href.startsWith('http') ? "_blank" : "_self"}
                        className="inline-flex items-center gap-6 bg-accent text-white px-10 py-5 tracking-[0.2em] uppercase text-[11px] font-bold hover:bg-primary transition-all rounded-sm shadow-xl"
                      >
                        {data.cta.title}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {data.gallery && (
            <section className="py-32 bg-secondary border-t border-gray-100">
              <div className="max-w-[1440px] mx-auto px-6">
                <div className="text-center mb-24">
                  <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">Gallery</h2>
                  <h3 className="text-5xl text-black tracking-tight uppercase font-sans font-bold">Space Experience</h3>
                </div>
                <div className="relative group max-w-5xl mx-auto">
                  <div className="relative overflow-hidden bg-white luxury-shadow luxury-border rounded-sm">
                    <div className="grid">
                      {data.gallery.map((img: string, idx: number) => (
                        <div 
                          key={idx}
                          className={`col-start-1 row-start-1 transition-all duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`갤러리 이미지 ${idx + 1}`} className="w-full h-auto block" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-12 gap-4">
                    {data.gallery.map((_: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-[2px] transition-all duration-500 ${idx === currentSlide ? 'bg-primary w-12' : 'bg-gray-200 w-6 hover:bg-primary/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
