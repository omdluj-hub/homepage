import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Fetch Visits (최근 1000개)
    const { data: visits, error: vError } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (vError) throw vError;

    // 2. Fetch Inquiries
    const { data: inquiries, error: iError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (iError) throw iError;

    // 3. Process Stats
    const totalVisits = visits.length;
    const botVisits = visits.filter((v: any) => v.is_bot).length;
    const humanVisits = totalVisits - botVisits;

    const pageViews: any = {};
    const referers: any = {};

    visits.forEach((v: any) => {
      // Page Views
      pageViews[v.path] = (pageViews[v.path] || 0) + 1;
      // Referers
      const ref = v.referer.split('/')[2] || v.referer;
      referers[ref] = (referers[ref] || 0) + 1;
    });

    const stats = {
      totalVisits,
      botVisits,
      humanVisits,
      pageViews,
      topReferers: Object.entries(referers)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 10),
      recentInquiries: inquiries.map((inq: any) => ({
        id: inq.id,
        name: inq.name,
        phone: inq.phone,
        category: inq.category,
        message: inq.message,
        timestamp: inq.created_at
      }))
    };

    return NextResponse.json(stats);
  } catch (e) {
    console.error('Stats Error:', e);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
