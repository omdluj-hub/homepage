import { NextRequest, NextResponse } from 'next/server';
import { supabase, isBot } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const bot = isBot(userAgent);
    
    const { error } = await supabase.from('visits').insert([
      { 
        path, 
        referer: referer || 'Direct', 
        user_agent: userAgent, 
        is_bot: bot 
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true, isBot: bot });
  } catch (e) {
    console.error('Tracking Error:', e);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
