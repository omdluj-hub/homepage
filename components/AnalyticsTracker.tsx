"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            referer: document.referrer || null
          })
        });
      } catch (e) {
        console.error("Analytics error:", e);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
