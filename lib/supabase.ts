import { createClient } from '@supabase/supabase-js';

// Vercel Supabase Integration은 보통 아래 변수들을 제공합니다.
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  'https://placeholder-url.supabase.co';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function isBot(userAgent: string): boolean {
  const bots = [
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baidu', 'baiduspider',
    'sogou', 'exabot', 'facebot', 'ia_archiver', 'gptbot', 'chatgpt', 'openai', 
    'claudebot', 'anthropic', 'gemini', 'google-images'
  ];
  const ua = userAgent.toLowerCase();
  return bots.some(bot => ua.includes(bot));
}
