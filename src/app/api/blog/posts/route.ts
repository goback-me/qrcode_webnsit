import { createClient } from '@/lib/supabase.server';
import { CreateBlogPostInput } from '@/types/blog';
import { NextRequest, NextResponse } from 'next/server';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Try cookie-based session first
    let {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Fallback: allow Authorization: Bearer <access_token>
    if (authError || !user) {
      const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
      const bearerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length).trim()
        : '';

      if (bearerToken) {
        const bearerAuthResult = await supabase.auth.getUser(bearerToken);
        user = bearerAuthResult.data.user;
        authError = bearerAuthResult.error;
      }
    }

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Unauthorized: Please log in or provide a valid Bearer token to create a blog post',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      title, 
      slug: providedSlug,
      content, 
      excerpt, 
      featured_image, 
      category, 
      tags,
      meta_title,
      meta_description,
      draft,
      is_indexed
    } = body as CreateBlogPostInput;

    // Validation
    if (!title || !content || !excerpt || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const slug = providedSlug ? generateSlug(providedSlug) : generateSlug(title);
    const readingTime = calculateReadingTime(content);

    console.log('Creating blog post - Title:', title, 'Slug:', slug, 'Author ID:', user.id);

    // Create blog post in Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title,
          slug,
          content,
          excerpt,
          featured_image,
          category,
          tags: tags || [],
          meta_title: meta_title || title,
          meta_description: meta_description || excerpt,
          author_id: user.id,
          author: user.user_metadata?.full_name || 'Author',
          reading_time: readingTime,
          published: !draft,
          draft: draft || false,
          is_indexed: is_indexed !== false,
          views: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase create error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create post: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Blog post created successfully - ID:', data?.id, 'Slug:', data?.slug);

    return NextResponse.json(
      {
        success: true,
        data,
        message: 'Blog post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  } 
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
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
