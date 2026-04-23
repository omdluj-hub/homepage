import { NextRequest, NextResponse } from 'next/server';
import { supabase, isBot } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();
    const headerList = await headers();
    
    const userAgent = headerList.get('user-agent') || 'unknown';
    
    // IP 주소 추출 시도 (Vercel 특화 헤더 포함)
    const ip = 
      headerList.get('x-forwarded-for')?.split(',')[0] || 
      headerList.get('x-real-ip') || 
      headerList.get('cf-connecting-ip') || // Cloudflare 등 대응
      '127.0.0.1';
    
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
