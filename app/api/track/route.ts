import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB, isBot } from '@/lib/db-utils';

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    const db = readDB();
    const bot = isBot(userAgent);
    
    const newVisit = {
      id: Date.now().toString(),
      path,
      referer: referer || 'Direct',
      userAgent,
      timestamp: new Date().toISOString(),
      isBot: bot
    };

    // Keep only last 1000 visits to avoid file bloat
    db.visits.unshift(newVisit);
    if (db.visits.length > 1000) db.visits.pop();
    
    // Update Page Views
    db.pageViews[path] = (db.pageViews[path] || 0) + 1;
    
    writeDB(db);
    return NextResponse.json({ success: true, isBot: bot });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
