import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    console.log('Received inquiry data:', inquiryData);
    
    const { data, error } = await supabase.from('inquiries').insert([
      {
        name: inquiryData.name,
        phone: inquiryData.phone,
        category: inquiryData.category,
        message: inquiryData.message
      }
    ]);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    console.error('Internal Server Error:', e);
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
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
