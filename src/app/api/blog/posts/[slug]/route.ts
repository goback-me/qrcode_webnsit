import { createClient } from '@/lib/supabase.server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { slug } = await params;

    console.log('Fetching blog post with slug:', slug);

    const restParams = new URLSearchParams({
      select: '*',
      slug: `eq.${slug}`,
      published: 'eq.true',
      draft: 'eq.false',
      limit: '1',
    });

    const postResponse = await fetch(
      `${supabaseUrl}/rest/v1/blog_posts?${restParams.toString()}`,
      {
        headers: {
          apikey: supabaseAnonKey,
        },
        cache: 'no-store',
      }
    );

    if (!postResponse.ok) {
      const text = await postResponse.text();
      console.error('Public post fetch error:', text);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }

    const posts = (await postResponse.json()) as Array<Record<string, any>>;
    const post = posts[0];

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const nextViews = Number(post.views || 0) + 1;
    void fetch(`${supabaseUrl}/rest/v1/blog_posts?id=eq.${post.id}`, {
      method: 'PATCH',
      headers: {
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ views: nextViews }),
      cache: 'no-store',
    });

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();
    const { slug } = await params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the blog post
    const { data: post, error: getError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (getError || !post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: You can only edit your own posts' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, excerpt, featured_image, category, tags } = body;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        content,
        excerpt,
        featured_image,
        category,
        tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: 'Blog post updated successfully',
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();
    const { slug } = await params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the blog post
    const { data: post, error: getError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (getError || !post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: You can only delete your own posts' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post.id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post deleted successfully',
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
