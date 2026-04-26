import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Vercel 캐싱 방지
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: visits, error: vError } = await supabase.from('visits').select('*').order('created_at', { ascending: false }).limit(2000);
    if (vError) throw vError;

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. 홈페이지 데이터
    const { data: inquiries } = await adminSupabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(50);

    // 2. 이벤트 데이터 (다중 테이블 조회 및 필드 정밀 매핑)
    const [res1, res2, res3] = await Promise.all([
      adminSupabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(50),
      adminSupabase.from('Consultation').select('*').order('createdAt', { ascending: false }).limit(50),
      adminSupabase.from('consultations').select('*').order('createdAt', { ascending: false }).limit(50)
    ]);

    const combinedInquiries = [
      ...(inquiries || []).map(i => ({ 
        ...i, 
        id: `inquiries:${i.id}`, 
        source: '홈페이지', 
        timestamp: i.created_at,
        is_read: i.is_read ?? false 
      })),
      ...(res1.data || []).map(r => ({ 
        ...r, 
        id: `reservations:${r.id}`, 
        source: '이벤트', 
        timestamp: r.created_at, 
        name: r.customer_name || r.name || r.username || '이름없음', // customer_name 우선
        phone: r.customer_phone || r.phone || r.tel || '', // customer_phone 우선
        category: r.sub_category || r.category || r.subject || '이벤트 상담', 
        is_read: r.is_read ?? r.isRead ?? false 
      })),
      ...(res2.data || []).map(c => ({ 
        ...c, 
        id: `Consultation:${c.id}`, 
        source: '이벤트', 
        timestamp: c.createdAt || c.created_at, 
        name: c.name || '이름없음', 
        phone: c.phone || '',
        category: c.category || '이벤트 상담', 
        is_read: c.isRead ?? c.is_read ?? false 
      })),
      ...(res3.data || []).map(c => ({ 
        ...c, 
        id: `consultations:${c.id}`, 
        source: '이벤트', 
        timestamp: c.createdAt || c.created_at, 
        name: c.name || '이름없음', 
        phone: c.phone || '',
        category: c.category || '이벤트 상담', 
        is_read: c.isRead ?? c.is_read ?? false 
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const uniqueInquiries = Array.from(new Map(combinedInquiries.map(item => [item.id, item])).values());

    const pageViews: any = {};
    const referers: any = {};
    visits.forEach((v: any) => {
      pageViews[v.path] = (pageViews[v.path] || 0) + 1;
      const ref = v.referer?.split('/')[2] || v.referer || 'Direct';
      referers[ref] = (referers[ref] || 0) + 1;
    });

    return NextResponse.json({
      totalVisits: visits.length,
      unreadInquiries: uniqueInquiries.filter(i => !i.is_read).length,
      stats7d: { total: visits.filter(v => v.created_at >= sevenDaysAgo).length },
      stats30d: { total: visits.filter(v => v.created_at >= thirtyDaysAgo).length },
      pageViews,
      topReferers: Object.entries(referers).sort((a: any, b: any) => b[1] - a[1]).slice(0, 10),
      recentInquiries: uniqueInquiries.slice(0, 50)
    });
  } catch (e: any) {
    console.error('Stats API Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
