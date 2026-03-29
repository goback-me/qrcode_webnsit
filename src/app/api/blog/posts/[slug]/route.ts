import { createClient } from '@/lib/supabase.server';
import { createPublicClient } from '@/lib/supabase.public';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const publicSupabase = createPublicClient();
    const { slug } = await params;

    console.log('Fetching blog post with slug:', slug);

    // Public first: return published, non-draft posts for everyone.
    const { data: publishedPost, error: publishedError } = await publicSupabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .eq('draft', false)
      .single();

    if (!publishedError && publishedPost) {
      await publicSupabase
        .from('blog_posts')
        .update({ views: (publishedPost.views || 0) + 1 })
        .eq('id', publishedPost.id);

      return NextResponse.json(
        {
          success: true,
          data: publishedPost,
        },
        { status: 200 }
      );
    }

    let userId: string | null = null;

    // Optional auth path for draft previews. Errors here should not break public access.
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    } catch (authLookupError) {
      console.warn('Optional auth lookup failed for blog slug route:', authLookupError);
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const supabase = await createClient();
    const { data: ownPost, error: ownPostError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('author_id', userId)
      .single();

    if (ownPostError) {
      console.error('Draft lookup error:', ownPostError);
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: ownPost,
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
