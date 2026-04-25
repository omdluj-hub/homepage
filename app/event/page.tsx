"use client";

import { useEffect, useState } from "react";

export default function AdminInquiryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        src="https://bbs-ruddy-iota.vercel.app/diet"
        className="w-full h-full border-none"
        title="비대면 상담 신청 관리"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
