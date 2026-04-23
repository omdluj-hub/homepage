import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: visits, error: vError } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (vError) throw vError;

    const { data: inquiries, error: iError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (iError) throw iError;

    const totalVisits = visits.length;
    const botVisits = visits.filter((v: any) => v.is_bot).length;
    const humanVisits = totalVisits - botVisits;

    const pageViews: any = {};
    const referers: any = {};

    visits.forEach((v: any) => {
      pageViews[v.path] = (pageViews[v.path] || 0) + 1;
      const ref = v.referer.split('/')[2] || v.referer;
      referers[ref] = (referers[ref] || 0) + 1;
    });

    const stats = {
      totalVisits,
      botVisits,
      humanVisits,
      unreadInquiries: inquiries.filter((inq: any) => !inq.is_read).length, // 안 읽은 상담 개수
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
        is_read: inq.is_read, // 읽음 상태 추가
        timestamp: inq.created_at
      }))
    };

    return NextResponse.json(stats);
  } catch (e: any) {
    console.error('Stats Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
