import { createClient } from '@/lib/supabase.server';
import { NextRequest, NextResponse } from 'next/server';

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
          error: 'Unauthorized: Please log in or provide a valid Bearer token',
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    // Path structure: {user-id}/{filename} - required by storage policy
    const filePath = `${user.id}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('blog-storage')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Storage error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('blog-storage').getPublicUrl(filePath);

    return NextResponse.json(
      {
        success: true,
        data: {
          url: publicUrl,
          path: filePath,
        },
        message: 'Image uploaded successfully',
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
