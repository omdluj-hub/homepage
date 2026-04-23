import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db-utils';

export async function GET() {
  try {
    const db = readDB();
    
    // Summarize Referers
    const referers: any = {};
    db.visits.forEach((v: any) => {
      const ref = v.referer.split('/')[2] || v.referer; // Get domain
      referers[ref] = (referers[ref] || 0) + 1;
    });

    const stats = {
      totalVisits: db.visits.length,
      botVisits: db.visits.filter((v: any) => v.isBot).length,
      humanVisits: db.visits.filter((v: any) => !v.isBot).length,
      pageViews: db.pageViews,
      topReferers: Object.entries(referers)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 10),
      recentInquiries: db.inquiries.slice(0, 10)
    };

    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
