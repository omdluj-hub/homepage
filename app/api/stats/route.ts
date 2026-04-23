import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // 1. 전체 방문자 및 최근 기록
    const { data: visits, error: vError } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2000); // 분석을 위해 충분한 데이터 로드

    if (vError) throw vError;

    // 2. 상담 신청 기록 (최근 50개)
    const { data: inquiries, error: iError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (iError) throw iError;

    // 3. 통계 계산 로직
    const totalVisits = visits.length;
    const botVisits = visits.filter((v: any) => v.is_bot).length;
    const humanVisits = totalVisits - botVisits;

    // 최근 7일/30일 통계
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

    // 페이지별/유입경로별 통계 (전체 기준)
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
      unreadInquiries: inquiries.filter((inq: any) => !inq.is_read).length,
      stats7d,
      stats30d,
      pageViews,
      topReferers: Object.entries(referers)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 15),
      recentInquiries: inquiries.map((inq: any) => ({
        id: inq.id,
        name: inq.name,
        phone: inq.phone,
        category: inq.category,
        message: inq.message,
        is_read: inq.is_read,
        timestamp: inq.created_at
      }))
    };

    return NextResponse.json(stats);
  } catch (e: any) {
    console.error('Stats Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
