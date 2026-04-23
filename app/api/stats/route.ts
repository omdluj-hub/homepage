import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: visits, error: vError } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2000);

    if (vError) throw vError;

    const { data: inquiries, error: iError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (iError) throw iError;

    const totalVisits = visits.length;
    const botVisits = visits.filter((v: any) => v.is_bot).length;
    const humanVisits = totalVisits - botVisits;

    const last7Days = visits.filter((v: any) => v.created_at >= sevenDaysAgo);
    const last30Days = visits.filter((v: any) => v.created_at >= thirtyDaysAgo);

    const stats7d = {
      total: last7Days.length,
      human: last7Days.filter((v: any) => !v.is_bot).length,
      bot: last7Days.filter((v: any) => v.is_bot).length
    };

    const stats30d = {
      total: last30Days.length,
      human: last30Days.filter((v: any) => !v.is_bot).length,
      bot: last30Days.filter((v: any) => v.is_bot).length
    };

    const pageViews: any = {};
    const referers: any = {};
    visits.forEach((v: any) => {
      pageViews[v.path] = (pageViews[v.path] || 0) + 1;
      const ref = v.referer.split('/')[2] || v.referer;
      referers[ref] = (referers[ref] || 0) + 1;
    });

    const recentRawVisits = visits.slice(0, 50).map((v: any) => ({
      id: v.id,
      path: v.path,
      referer: v.referer,
      ip: v.ip || '0.0.0.0', // Unknown 대신 0.0.0.0으로 표시하여 구별
      isBot: v.is_bot,
      timestamp: v.created_at
    }));

    return NextResponse.json({
      totalVisits,
      botVisits,
      humanVisits,
      unreadInquiries: inquiries.filter((inq: any) => !inq.is_read).length,
      stats7d,
      stats30d,
      pageViews,
      recentRawVisits,
      topReferers: Object.entries(referers).sort((a: any, b: any) => b[1] - a[1]).slice(0, 15),
      recentInquiries: inquiries.map((inq: any) => ({
        id: inq.id,
        name: inq.name,
        phone: inq.phone,
        category: inq.category,
        message: inq.message,
        is_read: inq.is_read,
        timestamp: inq.created_at
      }))
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
