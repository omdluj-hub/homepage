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

    // 이벤트 페이지의 reservations 데이터 추가 호출
    const { data: reservations, error: rError } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // reservations 테이블이 없을 수도 있으므로 에러 처리를 유연하게 함
    const validInquiries = inquiries || [];
    const validReservations = reservations || [];

    const combinedInquiries = [
      ...validInquiries.map((inq: any) => ({
        ...inq,
        source: '홈페이지',
        timestamp: inq.created_at
      })),
      ...validReservations.map((res: any) => ({
        ...res,
        source: '이벤트',
        timestamp: res.created_at,
        // reservations 테이블의 컬럼명이 다를 경우를 대비한 매핑
        name: res.name || res.username || '이름없음',
        phone: res.phone || res.tel || '',
        category: res.category || res.subject || '이벤트 상담',
        message: res.message || res.content || ''
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

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
      ip: v.ip || '0.0.0.0',
      isBot: v.is_bot,
      timestamp: v.created_at
    }));

    return NextResponse.json({
      totalVisits,
      botVisits,
      humanVisits,
      unreadInquiries: combinedInquiries.filter((inq: any) => !inq.is_read).length,
      stats7d,
      stats30d,
      pageViews,
      recentRawVisits,
      topReferers: Object.entries(referers).sort((a: any, b: any) => b[1] - a[1]).slice(0, 15),
      recentInquiries: combinedInquiries.slice(0, 50)
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
