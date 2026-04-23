import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    
    const { error } = await supabase.from('inquiries').insert([
      {
        name: inquiryData.name,
        phone: inquiryData.phone,
        category: inquiryData.category,
        message: inquiryData.message
      }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Inquiry Error:', e);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
