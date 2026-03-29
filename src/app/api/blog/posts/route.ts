import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const category = searchParams.get('category');

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const restParams = new URLSearchParams({
      select: '*',
      published: 'eq.true',
      draft: 'eq.false',
      is_indexed: 'eq.true',
      order: 'created_at.desc',
    });

    if (category) {
      restParams.set('category', `eq.${category}`);
    }

    const dataResponse = await fetch(
      `${supabaseUrl}/rest/v1/blog_posts?${restParams.toString()}`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Range: `${start}-${end}`,
          Prefer: 'count=exact',
        },
        cache: 'no-store',
      }
    );

    if (!dataResponse.ok) {
      const text = await dataResponse.text();
      return NextResponse.json(
        { success: false, error: text || 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    const data = await dataResponse.json();
    const contentRange = dataResponse.headers.get('content-range');
    const total = contentRange ? Number(contentRange.split('/')[1] || 0) : 0;

    return NextResponse.json(
      {
        success: true,
        data: {
          posts: data,
          total,
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
