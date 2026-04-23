import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    
    const { data, error } = await supabase.from('inquiries').insert([
      {
        name: inquiryData.name,
        phone: inquiryData.phone,
        category: inquiryData.category,
        message: inquiryData.message
      }
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, is_read } = await req.json();
    const { error } = await supabase.from('inquiries').update({ is_read }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// 상담 삭제 기능 추가 (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json(); // 삭제할 ID 배열
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .in('id', ids);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
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
