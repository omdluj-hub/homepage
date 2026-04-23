import { NextRequest, NextResponse } from 'next/server';
import { supabase, isBot } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // IP 주소 추출 (Vercel 및 일반 프록시 환경 대응)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || '127.0.0.1';
    
    const bot = isBot(userAgent);
    
    const { error } = await supabase.from('visits').insert([
      { 
        path, 
        referer: referer || 'Direct', 
        user_agent: userAgent, 
        is_bot: bot,
        ip: ip // IP 저장 추가
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true, isBot: bot });
  } catch (e) {
    console.error('Tracking Error:', e);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
