import { NextRequest, NextResponse } from 'next/server';
import { supabase, isBot } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // IP 주소 추출: x-forwarded-for 헤더를 우선적으로 사용하고, 없으면 x-real-ip를 사용합니다.
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const xRealIp = req.headers.get('x-real-ip');
    
    const ip = xForwardedFor ? xForwardedFor.split(',')[0] : (xRealIp || '127.0.0.1');
    
    const bot = isBot(userAgent);
    
    const { error } = await supabase.from('visits').insert([
      { 
        path, 
        referer: referer || 'Direct', 
        user_agent: userAgent, 
        is_bot: bot,
        ip: ip
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true, isBot: bot });
  } catch (e) {
    console.error('Tracking Error:', e);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
