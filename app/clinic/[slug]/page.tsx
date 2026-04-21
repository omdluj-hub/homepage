import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const CLINIC_DATA: Record<string, any> = {
  // 피부 클리닉
  "skin": {
    title: "피부 클리닉",
    subtitle: "피부 고민의 근본적 원인을 해결하는 한방 맞춤 솔루션",
    description: "여드름부터 난치성 피부 질환까지, 겉으로 보이는 증상뿐만 아니라 몸 내부의 불균형을 바로잡아 재발 없는 건강한 피부를 되찾아 드립니다.",
    image: "/images/상담.jpg",
    features: [{ title: "개별 맞춤 진단", desc: "피부 상태와 체질을 분석한 1:1 진료" }],
  },
  "skin/acne": { title: "여드름", subtitle: "재발 방지를 위한 여드름 근본 치료", description: "염증 진정과 피지 조절, 각질 탈락 주기를 정상화하여 여드름이 반복되는 환경을 개선합니다.", image: "/images/상담.jpg", features: [{ title: "압출 관리", desc: "흉터 없는 미세 압출" }] },
  "skin/scar": { title: "여드름흉터", subtitle: "패인 흉터에 새살이 차오르는 재생 치료", description: "정교한 미세침 치료를 통해 손상된 피부 조직의 재생을 유도하여 매끄러운 피부결을 만듭니다.", image: "/images/집중관리.jpg", features: [{ title: "재생 치료", desc: "새살이 차오르는 특수 침법" }] },
  "skin/mark": { title: "여드름자국", subtitle: "붉고 검은 자국 없는 깨끗한 안색", description: "색소 침착을 제거하고 혈액 순환을 도와 어두워진 여드름 자국을 효과적으로 개선합니다.", image: "/images/집중관리.jpg", features: [{ title: "미백 관리", desc: "안색 개선 및 색소 치료" }] },
  "skin/wart": { title: "사마귀", subtitle: "바이러스 면역 강화를 통한 사마귀 치료", description: "재발이 잦은 사마귀를 면역력 강화와 직접적인 환부 치료를 병행하여 깔끔하게 제거합니다.", image: "/images/상담.jpg", features: [{ title: "면역 강화", desc: "바이러스 저항력 증대" }] },
  "skin/seborrheic": { title: "지루성/주사피부염", subtitle: "예민해진 피부 장벽 회복과 염증 진정", description: "열감을 내리고 무너진 피부 장벽을 세워 만성적인 염증과 가려움을 해결합니다.", image: "/images/집중관리.jpg", features: [{ title: "진정 관리", desc: "피부 열감 및 염증 완화" }] },
  "skin/rosacea": { title: "안면홍조", subtitle: "혈관 확장과 안면 열 상충의 근본적 해결", description: "정서적 자극이나 온도 변화에도 민감하게 반응하는 혈관 문제를 체계적으로 관리합니다.", image: "/images/집중관리.jpg", features: [{ title: "혈관 안정", desc: "붉은 기 개선 및 열감 조절" }] },

  // 피부미용
  "beauty": { title: "피부미용 클리닉", subtitle: "자연스러운 아름다움, 건강한 안티에이징", description: "인위적이지 않은 한방 성분과 침 요법으로 얼굴의 탄력을 높이고 윤곽을 정리합니다.", image: "/images/설문지작성.jpg", features: [{ title: "탄력 강화", desc: "속부터 차오르는 자연스러운 볼륨" }] },
  "beauty/lifting": { title: "리프팅", subtitle: "매선 요법으로 완성하는 탄탄한 브이라인", description: "피부 속에 녹는 실을 자입하여 콜라겐 생성을 유도하고 처진 살을 끌어올립니다.", image: "/images/설문지작성.jpg", features: [{ title: "매선 요법", desc: "실 리프팅을 통한 탄력 개선" }] },
  "beauty/contour": { title: "윤곽약침", subtitle: "불필요한 지방 정리와 갸름한 얼굴 라인", description: "천연 약재 성분을 주입하여 얼굴의 부종과 지방을 정리하고 뚜렷한 윤곽을 만듭니다.", image: "/images/설문지작성.jpg", features: [{ title: "지방 분해", desc: "자연스러운 윤곽 교정" }] },
  "beauty/skin-booster": { title: "스킨부스터", subtitle: "피부 깊숙이 영양을 채우는 광채 테라피", description: "피부 재생을 돕는 유효 성분을 직접 전달하여 수분감과 안색을 즉각적으로 개선합니다.", image: "/images/설문지작성.jpg", features: [{ title: "영양 공급", desc: "수분 보충 및 피부 광채" }] },

  // 다이어트
  "diet": { title: "다이어트 클리닉", subtitle: "체질에 맞는 건강한 감량 솔루션", description: "단순한 체중 감량이 아닌, 건강을 지키면서 아름다운 몸매를 만드는 지속 가능한 다이어트를 제안합니다.", image: "/images/다이어트효과.jpg", features: [{ title: "체질 진단", desc: "살이 찌는 원인을 분석하는 정밀 검사" }] },
  "diet/medicine": { title: "다이어트 한약", subtitle: "복용이 간편하고 효과적인 체지방 감량 한약", description: "식욕 억제와 기초 대사량 증진을 돕는 다요정, 미감탕 등 개인 맞춤형 한약을 처방합니다.", image: "/images/미감탕.JPG", features: [{ title: "맞춤 처방", desc: "개인별 감량 단계에 따른 처방" }] },
  "diet/program": { title: "다이어트 관리", subtitle: "체계적인 식이 교육과 요요 방지 관리", description: "전문적인 식이 상담과 생활 습관 교정을 통해 감량한 체중을 안정적으로 유지하게 돕습니다.", image: "/images/설문지작성.jpg", features: [{ title: "요요 방지", desc: "건강한 유지기 프로그램" }] },
  "diet/point": { title: "비만약침", subtitle: "고민되는 국소 부위 집중 지방 분해", description: "복부, 팔뚝, 허벅지 등 쉽게 빠지지 않는 부위의 지방을 집중적으로 분해합니다.", image: "/images/다이어트효과.jpg", features: [{ title: "부위별 관리", desc: "원하는 부위 집중 감량" }] },
  "diet/remote": { 
    title: "비대면 상담", 
    subtitle: "병원 방문 없이 편리하게 받는 비대면 진료", 
    description: "바쁜 일정으로 내원이 어려우신 분들을 위해 전화나 화상을 통한 비대면 진료를 운영합니다.", 
    image: "/images/비대면처방.jpg", 
    features: [{ title: "편리한 진료", desc: "어디서나 가능한 1:1 상담" }],
    cta: { title: "비대면 상담 신청하기", href: "https://bbs-ruddy-iota.vercel.app/diet" }
  },

  // 교통사고
  "traffic": { title: "교통사고 클리닉", subtitle: "사고 후유증, 초기 집중 치료가 핵심입니다", description: "갑작스러운 사고로 인한 통증과 후유증을 방지하기 위해 365일 체계적인 입원 및 통원 치료를 제공합니다.", image: "/images/인바디검사.jpg", features: [{ title: "365일 진료", desc: "사고 즉시 시작하는 집중 치료" }] },
  "traffic/treatment": { 
    title: "교통사고 치료", 
    subtitle: "체계적인 단계별 치료로 후유증의 뿌리까지 해결합니다", 
    description: "단순한 통증 완화를 넘어, 사고 충격으로 흐트러진 신체 밸런스를 바로잡고 신경계의 안정을 도모합니다. 침, 약침, 부항 등 최적의 한방 복합 솔루션을 통해 빠른 회복을 돕습니다.", 
    image: "/images/상담.jpg", 
    features: [
      { title: "맞춤 한약 처방", desc: "미세 혈류를 개선하고 염증 물질 배출을 촉진하는 개인별 맞춤 한약" },
      { title: "약침 및 침 치료", desc: "손상된 조직의 염증을 제어하고 긴장된 근육과 신경을 이완" }
    ] 
  },
  "traffic/chuna": { 
    title: "추나요법", 
    subtitle: "신체 균형을 되찾아 통증의 근본 원인을 해결하는 수기 교정", 
    description: "한의사의 숙련된 손길로 틀어진 뼈와 근육을 바로잡아 통증을 완화하고 기능을 회복시키는 치료입니다. 사고로 인한 충격이나 잘못된 자세로 무너진 신체 정렬을 바로잡아 후유증을 예방합니다.", 
    image: "/images/인바디검사.jpg", 
    features: [
      { title: "정밀 체형 교정", desc: "틀어진 척추와 골반을 정렬하여 신체 불균형 및 신경 압박 개선" },
      { title: "근육 및 인대 이완", desc: "경직된 조직을 부드럽게 풀어주어 통증을 완화하고 가동 범위 확대" }
    ] 
  },
  "traffic/room": { title: "프리미엄 입원실", subtitle: "회복에만 전념할 수 있는 쾌적한 1인실", description: "호텔급 시설의 프라이빗 1인실에서 24시간 집중 케어를 받으실 수 있습니다.", image: "/images/비대면처방.jpg", features: [{ title: "쾌적한 환경", desc: "모든 병실 1인실 구성" }] },
};

export default function ClinicDetailPage({ params }: { params: { slug: string[] } }) {
  // slug가 배열로 들어오므로 (예: ['skin', 'acne']) 문자열로 합쳐서 조회
  const fullPath = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const data = CLINIC_DATA[fullPath];

  if (!data) notFound();

  return (
    <div className="flex flex-col">
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl text-gray-200">{data.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[450px] w-full border border-gray-100">
                <Image src={data.image} alt={data.title} fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-primary mb-6">진료 안내</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">{data.description}</p>
              <div className="space-y-6">
                {data.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-point-green font-bold border border-gray-100">{idx + 1}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-muted text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {data.cta && (
                <div className="mt-12">
                  <a 
                    href={data.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-point-green text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all"
                  >
                    {data.cta.title}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
