"use client";

import { useEffect, useState } from "react";

export default function EventPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        src="https://event-snowy-ten.vercel.app/"
        className="w-full h-full border-none"
        title="후한의원 구미점 이벤트"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
