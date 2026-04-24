import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

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

    // 1. 홈페이지 상담 데이터 (일반 클라이언트 사용)
    const { data: inquiries, error: iError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // 2. 이벤트 페이지 데이터 (Service Role 클라이언트 사용 - 가이드 준수)
    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: reservations, error: rError } = await adminSupabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    const validInquiries = inquiries || [];
    const validReservations = reservations || [];

    const combinedInquiries = [
      ...validInquiries.map((inq: any) => ({
        ...inq,
        source: '홈페이지',
        timestamp: inq.created_at
      })),
      ...validReservations.map((res: any) => ({
        ...res, // 모든 원본 필드 유지 (중요)
        source: '이벤트',
        timestamp: res.created_at,
        // 리스트 뷰에서 공통으로 보여줄 필드 매핑
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
