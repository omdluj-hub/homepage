import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db-utils';

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    const db = readDB();
    
    const newInquiry = {
      ...inquiryData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

    db.inquiries.unshift(newInquiry);
    writeDB(db);
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.inquiries);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
