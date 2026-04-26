import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getAdminClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: NextRequest) {
  try {
    const { id: prefixedId, is_read } = await req.json();
    const adminSupabase = getAdminClient();

    const parts = prefixedId.split(':');
    const tableName = parts[0];
    const originalId = parts.slice(1).join(':');
    
    if (!tableName || !originalId) throw new Error('Invalid ID format');

    console.log(`[PATCH START] Table: ${tableName}, ID: ${originalId}, Target Status: ${is_read}`);

    // 시도할 시나리오 정의
    const idVariants = [originalId];
    if (!isNaN(Number(originalId))) idVariants.push(Number(originalId) as any);
    
    const columnVariants = ['is_read', 'isRead'];
    let finalSuccess = false;

    // 모든 조합을 순회하며 실제 반영(count > 0)될 때까지 시도
    for (const table of [tableName, tableName.toLowerCase(), 'reservations', 'Consultation']) {
      if (finalSuccess) break;
      
      for (const col of columnVariants) {
        if (finalSuccess) break;
        
        for (const idVal of idVariants) {
          const { count, error } = await adminSupabase
            .from(table)
            .update({ [col]: is_read })
            .eq('id', idVal)
            .select('*', { count: 'exact', head: true }); // 실제 변경 여부 확인

          if (!error && count && count > 0) {
            console.log(`[PATCH SUCCESS] Table: ${table}, Col: ${col}, ID: ${idVal}`);
            finalSuccess = true;
            break;
          }
        }
      }
    }

    if (!finalSuccess) {
      console.error(`[PATCH FAILED] No rows were updated for ID: ${originalId}`);
    }
    
    return NextResponse.json({ success: finalSuccess }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (e: any) {
    console.error('PATCH error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    const adminSupabase = getAdminClient();
    const { data, error } = await adminSupabase.from('inquiries').insert([{
      name: inquiryData.name,
      phone: inquiryData.phone,
      category: inquiryData.category,
      message: inquiryData.message,
      is_read: false
    }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { ids: prefixedIds } = await req.json();
    const adminSupabase = getAdminClient();

    for (const prefixedId of prefixedIds) {
      const [table, ...idParts] = prefixedId.split(':');
      const id = idParts.join(':');
      await adminSupabase.from(table).delete().eq('id', id);
      if (!isNaN(Number(id))) await adminSupabase.from(table).delete().eq('id', Number(id));
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
