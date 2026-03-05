# Blog Database Structure & SQL Reference

## Database Overview

The blog system uses **Supabase PostgreSQL** to store all blog posts with the following structure:

---

## 📊 Blog Posts Table

### Table Name: `blog_posts`

```sql
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 1
);
```

---

## 📋 Column Definitions

| Column | Type | Nullable | Default | Purpose |
|--------|------|----------|---------|---------|
| `id` | UUID | No | uuid_generate_v4() | Unique post identifier |
| `title` | VARCHAR(255) | No | - | Post title (required) |
| `slug` | VARCHAR(255) | No | - | URL-friendly slug (unique) |
| `content` | TEXT | No | - | Full post content |
| `excerpt` | TEXT | No | - | Brief summary for listing |
| `author` | VARCHAR(255) | No | - | Author name |
| `author_id` | UUID | No | - | Link to auth.users (foreign key) |
| `featured_image` | TEXT | Yes | NULL | URL to featured image |
| `category` | VARCHAR(50) | No | - | Post category |
| `tags` | TEXT[] | Yes | {} | Array of tags |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |
| `published` | BOOLEAN | No | true | Publish status |
| `views` | INTEGER | No | 0 | View counter |
| `reading_time` | INTEGER | No | 1 | Estimated read time (minutes) |

---

## 🔑 Indexes

Indexes improve query performance:

```sql
-- Fast slug lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Find user's posts
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);

-- Filter published posts
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);

-- Sort by newest first
CREATE INDEX idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
```

---

## 🔒 Row Level Security (RLS) Policies

### Policy 1: Public Can Read Published Posts
```sql
CREATE POLICY "Public posts are readable" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);
```
- Anyone can view published posts
- Unpublished posts hidden from public

### Policy 2: Users Can Read Their Own Posts
```sql
CREATE POLICY "Users can read own posts" 
ON public.blog_posts 
FOR SELECT 
USING (auth.uid() = author_id);
```
- Authors can view their unpublished drafts
- Users can't see other users' private posts

### Policy 3: Users Can Create Posts
```sql
CREATE POLICY "Users can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);
```
- Only authenticated users can create
- author_id automatically set to current user

### Policy 4: Users Can Update Own Posts
```sql
CREATE POLICY "Users can update own posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);
```
- Only post author can edit
- Can't change author_id

### Policy 5: Users Can Delete Own Posts
```sql
CREATE POLICY "Users can delete own posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() = author_id);
```
- Only post author can delete

---

## 📝 Example Data

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting Started with Next.js",
  "slug": "getting-started-with-nextjs",
  "content": "Next.js is a React framework...",
  "excerpt": "Learn the basics of Next.js",
  "author": "John Doe",
  "author_id": "110e8400-e29b-41d4-a716-446655440000",
  "featured_image": "https://cdn.example.com/nextjs.jpg",
  "category": "Tutorial",
  "tags": ["nextjs", "react", "web-development"],
  "created_at": "2024-03-06T10:00:00Z",
  "updated_at": "2024-03-06T12:30:00Z",
  "published": true,
  "views": 250,
  "reading_time": 8
}
```

---

## 🔄 Query Examples

### Get All Published Posts (with pagination)
```sql
SELECT * FROM public.blog_posts
WHERE published = true
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;
```

### Get User's Posts (published or draft)
```sql
SELECT * FROM public.blog_posts
WHERE author_id = 'user-uuid'
ORDER BY created_at DESC;
```

### Get Single Post by Slug
```sql
SELECT * FROM public.blog_posts
WHERE slug = 'my-post-slug'
AND published = true;
```

### Get Posts by Category
```sql
SELECT * FROM public.blog_posts
WHERE category = 'Technology'
AND published = true
ORDER BY created_at DESC;
```

### Get Posts with Specific Tag
```sql
SELECT * FROM public.blog_posts
WHERE published = true
AND tags @> ARRAY['nextjs']
ORDER BY created_at DESC;
```

### Get Most Viewed Posts
```sql
SELECT * FROM public.blog_posts
WHERE published = true
ORDER BY views DESC
LIMIT 10;
```

### Count Posts by Category
```sql
SELECT category, COUNT(*) as count
FROM public.blog_posts
WHERE published = true
GROUP BY category
ORDER BY count DESC;
```

### Get Recent Posts (Last 7 Days)
```sql
SELECT * FROM public.blog_posts
WHERE published = true
AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

## 🆚 Update Examples

### Update Post
```sql
UPDATE public.blog_posts
SET 
  title = 'New Title',
  content = 'New content',
  excerpt = 'New excerpt',
  updated_at = NOW()
WHERE id = 'post-uuid'
AND author_id = 'user-uuid';
```

### Increment View Count
```sql
UPDATE public.blog_posts
SET views = views + 1
WHERE slug = 'post-slug';
```

### Publish Post
```sql
UPDATE public.blog_posts
SET published = true
WHERE id = 'post-uuid';
```

---

## 🗑️ Delete Examples

### Soft Delete (set published to false)
```sql
UPDATE public.blog_posts
SET published = false
WHERE id = 'post-uuid'
AND author_id = 'user-uuid';
```

### Hard Delete (permanent)
```sql
DELETE FROM public.blog_posts
WHERE id = 'post-uuid'
AND author_id = 'user-uuid';
```

---

## 📊 Useful Views (Optional)

### Popular Posts View
```sql
CREATE VIEW public.popular_posts AS
SELECT 
  id, title, slug, excerpt, views, created_at
FROM public.blog_posts
WHERE published = true
ORDER BY views DESC
LIMIT 10;
```

### Recent Posts View
```sql
CREATE VIEW public.recent_posts AS
SELECT 
  id, title, slug, excerpt, author, created_at
FROM public.blog_posts
WHERE published = true
ORDER BY created_at DESC
LIMIT 20;
```

### Author Stats View
```sql
CREATE VIEW public.author_stats AS
SELECT 
  author_id,
  author,
  COUNT(*) as total_posts,
  SUM(views) as total_views,
  MAX(created_at) as last_post_date
FROM public.blog_posts
WHERE published = true
GROUP BY author_id, author;
```

---

## 🔗 Foreign Keys

### Relationship: blog_posts → auth.users

```sql
ALTER TABLE public.blog_posts
ADD CONSTRAINT fk_blog_posts_author
FOREIGN KEY (author_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;
```

- When a user is deleted, their posts are also deleted (CASCADE)
- This maintains data integrity

---

## 🎯 Keys & Constraints

| Constraint | Type | Details |
|-----------|------|---------|
| `blog_posts_pkey` | Primary Key | `id` (UUID) |
| `blog_posts_slug_key` | Unique | `slug` (no duplicates) |
| `fk_blog_posts_author` | Foreign Key | `author_id` → `auth.users.id` |

---

## ⚙️ Storage Cloud Setup

### Bucket: `blog-storage`
```
Bucket Name: blog-storage
Privacy: Public (anyone can view)
Path: blog-images/[user-id]-[timestamp].[ext]
Max Size: 5MB per file
Allowed Types: image/*
```

---

## 📈 Performance Optimization

### Query Performance Tips

1. **Always use indexes:**
   - slug lookups are O(1)
   - author_id filtering is fast
   - created_at sorting uses index

2. **Use pagination:**
   ```sql
   LIMIT 10 OFFSET (page-1)*10
   ```

3. **Filter published first:**
   ```sql
   WHERE published = true  -- narrows results quickly
   ```

4. **Avoid LIKE on text:**
   - Use full-text search for content search
   - Or implement Elasticsearch

---

## 🧪 Test Queries

### Count total posts
```sql
SELECT COUNT(*) FROM public.blog_posts;
```

### Check RLS is working
```sql
-- As public user, should only see published
SELECT COUNT(*) FROM public.blog_posts
WHERE published = true;
```

### List all tags
```sql
SELECT DISTINCT UNNEST(tags) as tag
FROM public.blog_posts
WHERE published = true;
```

---

## 📝 Notes

- `slug` is automatically generated from `title` (spaces → dashes, lowercase)
- `reading_time` is calculated (words ÷ 200 WPM)
- `views` increments when post is fetched
- `created_at` and `updated_at` are auto-managed by database
- All timestamps are in UTC (timezone aware)
- Tags are stored as PostgreSQL array type `TEXT[]`

---

## 🆘 Common Queries for Debugging

### Check if RLS is enabled
```sql
SELECT relname, rowsecurity
FROM pg_class
WHERE relname = 'blog_posts';
```

### List all policies
```sql
SELECT tablename, policyname
FROM pg_policies
WHERE tablename = 'blog_posts';
```

### Check indexes
```sql
SELECT indexname
FROM pg_indexes
WHERE tablename = 'blog_posts';
```

### View current privileges
```sql
SELECT grantee, privilege_type
FROM role_table_grants
WHERE table_name = 'blog_posts';
```

---

This database structure provides a solid foundation for the blog system with built-in security, performance, and scalability!
