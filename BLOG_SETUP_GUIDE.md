# Blog System Setup Guide

## Quick Start

This guide will help you set up the complete blog system with Supabase authentication and database.

## Prerequisites

- Supabase account (free at https://supabase.com)
- Next.js environment already set up
- Basic knowledge of SQL

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up
2. Click "New Project"
3. Fill in project details:
   - **Name**: Your project name
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
4. Wait for project to initialize (2-3 minutes)

## Step 2: Get API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Copy from "Project URL"
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Copy from "anon public" key
   - `SUPABASE_SERVICE_ROLE_KEY`: Copy from "service_role" key (keep secret!)

Your `.env.local` should look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  featured_image TEXT,
  category VARCHAR(50) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT true,
  draft BOOLEAN DEFAULT false,
  is_indexed BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 1
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_blog_posts_draft ON public.blog_posts(draft);
CREATE INDEX idx_blog_posts_is_indexed ON public.blog_posts(is_indexed);
CREATE INDEX idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published, non-draft posts
CREATE POLICY "Public posts are readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true AND draft = false);

-- Policy: Users can read their own posts (including drafts)
CREATE POLICY "Users can read own posts" 
ON public.blog_posts 
FOR SELECT 
USING (auth.uid() = author_id);

-- Policy: Users can create posts
CREATE POLICY "Users can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

-- Policy: Users can update their own posts
CREATE POLICY "Users can update own posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Policy: Users can delete their own posts
CREATE POLICY "Users can delete own posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() = author_id);
```

4. Click **Run**

## Step 4: Set Up Storage for Images

1. In Supabase, go to **Storage**
2. Click **Create a new bucket**
3. Name it: `blog-storage`
4. Make it **Public** (toggle on)
5. Click **Create bucket**

### Set Storage Policies

1. Click on `blog-storage` bucket
2. Go to **Policies** tab
3. Click **New Policy** → **For all users**
4. Select **SELECT** operation
5. Paste this condition:
```
true
```
This allows anyone to view uploaded images.

For uploads, click **New Policy** → **For authenticated users**
- Operation: **INSERT**
- Target roles: authenticated
- Condition:
```
auth.uid() = (storage.foldertextpath[0])::uuid
```

## Step 5: Install Dependencies

```bash
npm install @supabase/ssr
```

## Step 5.5: Migrate Existing Database (If You Already Have Blog Posts)

If you created the `blog_posts` table before this update, run this SQL to add the new columns:

```sql
-- Add SEO and publishing option columns
ALTER TABLE public.blog_posts
ADD COLUMN meta_title VARCHAR(255),
ADD COLUMN meta_description TEXT,
ADD COLUMN draft BOOLEAN DEFAULT false,
ADD COLUMN is_indexed BOOLEAN DEFAULT true;

-- Create indexes for the new columns
CREATE INDEX idx_blog_posts_draft ON public.blog_posts(draft);
CREATE INDEX idx_blog_posts_is_indexed ON public.blog_posts(is_indexed);

-- Update existing posts to be non-draft
UPDATE public.blog_posts SET draft = false WHERE draft IS NULL;

-- Update the published posts policy to account for draft status
DROP POLICY IF EXISTS "Public posts are readable" ON public.blog_posts;
CREATE POLICY "Public posts are readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true AND draft = false);
```

## Step 6: Enable Email Authentication (Optional)

1. Go to **Authentication** → **Providers**
2. Find **Email** provider
3. Click the toggle to enable
4. Optionally configure email verification

## Step 7: Test the Setup

### 1. Start your development server:
```bash
npm run dev
```

### 2. Navigate to: `http://localhost:3000/blog`

### 3. Click "Write Post" button

### 4. Test creating a blog post:
(You'll need to be logged in via Supabase auth)

## Troubleshooting

### Error: "Unauthorized: Please log in"
- Make sure Supabase auth is configured
- Check that you're logged in to your Supabase account
- Verify `.env.local` variables are set correctly

### Error: "Failed to fetch posts"
- Check Supabase database table exists
- Verify RLS policies are created
- Check browser console for detailed error messages

### Error: "Failed to upload image"
- Verify `blog-storage` bucket exists and is public
- Check storage policies are created
- Ensure file is image format and under 5MB

### Posts not showing up
- Verify `published = true` in database
- Check RLS policies allow SELECT
- Ensure posts have valid `author_id`

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── blog/
│   │       ├── posts/
│   │       │   ├── route.ts          # GET, POST for all posts
│   │       │   └── [slug]/route.ts   # GET, PUT, DELETE single post
│   │       └── upload/
│   │           └── route.ts          # Image upload
│   └── blog/
│       ├── page.tsx                  # Blog listing page
│       ├── create/
│       │   └── page.tsx              # Create post page
│       └── [slug]/
│           └── page.tsx              # Single post page
├── components/
│   └── blog/
│       ├── CreateBlogForm.tsx        # Form for creating posts
│       ├── BlogList.tsx              # List of posts
│       └── BlogDetail.tsx            # Single post view
├── lib/
│   └── supabase.ts                   # Supabase client setup
└── types/
    └── blog.ts                       # TypeScript types
```

## Making Your First API Request

### Using JavaScript:

```javascript
// Create a new blog post
async function createBlogPost() {
  const response = await fetch('/api/blog/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'My First Post',
      content: 'This is my first blog post content...',
      excerpt: 'This is a brief summary',
      category: 'Technology',
      tags: ['first-post', 'javascript'],
      featured_image: 'https://example.com/image.jpg',
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('Post created:', data.data);
  } else {
    console.error('Error:', data.error);
  }
}
```

### Using cURL:

```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "Content here...",
    "excerpt": "Brief summary",
    "category": "Technology",
    "tags": ["javascript"]
  }'
```

## Next Steps

1. **Set up authentication UI**: Add Supabase Auth UI components for login/signup
2. **Add comments**: Create comments table and API
3. **Add search**: Implement full-text search
4. **Add categories**: Create category management
5. **Admin dashboard**: Build admin panel to manage posts

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## Security Notes

⚠️ **Important**:
- Never commit `.env.local` to GitHub
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- RLS policies are essential for security
- Always validate user input
- Consider rate limiting for production

## Support

For issues:
1. Check [Blog API Documentation](/BLOG_API_DOCUMENTATION.md)
2. Review [Supabase Documentation](https://supabase.com/docs)
3. Check browser console for errors
4. Verify database and storage are properly configured
