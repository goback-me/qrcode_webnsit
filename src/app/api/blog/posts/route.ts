import { createPublicClient } from '@/lib/supabase.public';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = createPublicClient();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const category = searchParams.get('category');

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .eq('draft', false)
      .eq('is_indexed', true)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query.range(start, end - 1);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          posts: data,
          total: count || 0,
          page,
          pageSize,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
