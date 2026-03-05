import { createClient } from '@/lib/supabase.server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();
    const { slug } = await params;

    console.log('Fetching blog post with slug:', slug);

    // Get authenticated user (if any)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // First check if post exists at all (published or not)
    const { data: allData, error: allError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug);

    if (allError) {
      console.error('Database error:', allError);
      return NextResponse.json(
        { success: false, error: 'Database error: ' + allError.message },
        { status: 500 }
      );
    }

    console.log('Posts found with slug:', allData?.length || 0);

    if (!allData || allData.length === 0) {
      console.log('No posts found with slug:', slug);
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const post = allData[0];
    console.log('Post found - Published:', post.published, 'Draft:', post.draft, 'ID:', post.id);

    // Check if published and not draft
    // If it's a draft, only the author can view it
    if (post.draft || !post.published) {
      if (!user || user.id !== post.author_id) {
        return NextResponse.json(
          { success: false, error: 'Blog post not found' },
          { status: 404 }
        );
      }
    }

    // Increment view count only for published posts
    if (post.published && !post.draft) {
      await supabase
        .from('blog_posts')
        .update({ views: (post.views || 0) + 1 })
        .eq('id', post.id);
    }

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
