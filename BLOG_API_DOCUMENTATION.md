# Blog System API Documentation

## Overview
This is a secure, authenticated blog API built with Next.js and Supabase. All POST, PUT, and DELETE requests require authentication.

## Authentication
All endpoints that modify data (POST, PUT, DELETE) require the user to be authenticated via Supabase. The authentication is handled automatically through Supabase session management.

---

## API Endpoints

### 1. Create Blog Post
**POST** `/api/blog/posts`

Creates a new blog post. Requires authentication.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Getting Started with QR Codes",
  "content": "This is the main content of the blog post...",
  "excerpt": "Brief summary of the blog post",
  "category": "Technology",
  "tags": ["qr-code", "tutorial"],
  "featured_image": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Getting Started with QR Codes",
    "slug": "getting-started-with-qr-codes",
    "content": "...",
    "excerpt": "...",
    "author": "User Name",
    "author_id": "user-uuid",
    "featured_image": "...",
    "category": "Technology",
    "tags": ["qr-code", "tutorial"],
    "created_at": "2024-03-06T10:00:00Z",
    "updated_at": "2024-03-06T10:00:00Z",
    "published": true,
    "views": 0,
    "reading_time": 5
  },
  "message": "Blog post created successfully"
}
```

**Error Responses:**
```json
{
  "success": false,
  "error": "Unauthorized: Please log in to create a blog post"
}
```
Status: 401

---

### 2. Get All Blog Posts
**GET** `/api/blog/posts`

Retrieves all published blog posts with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)
- `category` (optional): Filter by category

**Example Request:**
```
GET /api/blog/posts?page=1&pageSize=10&category=Technology
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Getting Started with QR Codes",
        "slug": "getting-started-with-qr-codes",
        "content": "...",
        "excerpt": "...",
        "author": "User Name",
        "author_id": "user-uuid",
        "featured_image": null,
        "category": "Technology",
        "tags": ["qr-code"],
        "created_at": "2024-03-06T10:00:00Z",
        "updated_at": "2024-03-06T10:00:00Z",
        "published": true,
        "views": 150,
        "reading_time": 5
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 3. Get Single Blog Post by Slug
**GET** `/api/blog/posts/{slug}`

Retrieves a single published blog post by its slug. Automatically increments view count.

**Example Request:**
```
GET /api/blog/posts/getting-started-with-qr-codes
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Getting Started with QR Codes",
    "slug": "getting-started-with-qr-codes",
    "content": "...",
    "excerpt": "...",
    "author": "User Name",
    "author_id": "user-uuid",
    "featured_image": "...",
    "category": "Technology",
    "tags": ["qr-code"],
    "created_at": "2024-03-06T10:00:00Z",
    "updated_at": "2024-03-06T10:00:00Z",
    "published": true,
    "views": 151,
    "reading_time": 5
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

---

### 4. Update Blog Post
**PUT** `/api/blog/posts/{slug}`

Updates an existing blog post. Only the author can update their own posts.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "excerpt": "Updated excerpt",
  "category": "Technology",
  "tags": ["qr-code", "updated"],
  "featured_image": "https://example.com/new-image.jpg"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Updated Title",
    ...
  },
  "message": "Blog post updated successfully"
}
```

**Error Responses:**
```json
{
  "success": false,
  "error": "Unauthorized: You can only edit your own posts"
}
```
Status: 403

---

### 5. Delete Blog Post
**DELETE** `/api/blog/posts/{slug}`

Deletes a blog post. Only the author can delete their own posts.

**Example Request:**
```
DELETE /api/blog/posts/getting-started-with-qr-codes
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "error": "Unauthorized: You can only delete your own posts"
}
```

---

### 6. Upload Featured Image
**POST** `/api/blog/upload`

Uploads and stores a featured image for blog posts. Requires authentication.

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
- `file` (File): Image file (PNG, JPG, max 5MB)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/storage/blog-images/user-id-1234567.jpg",
    "path": "blog-images/user-id-1234567.jpg"
  },
  "message": "Image uploaded successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "File size exceeds 5MB limit"
}
```

---

## How to Make API Requests

### Using JavaScript/Fetch API

**Create a Blog Post:**
```javascript
const createPost = async () => {
  try {
    const response = await fetch('/api/blog/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'My First Blog Post',
        content: 'This is the full content of my blog post...',
        excerpt: 'This is a brief summary',
        category: 'Technology',
        tags: ['javascript', 'web'],
        featured_image: 'https://example.com/image.jpg',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Post created:', data.data);
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**Get All Posts:**
```javascript
const getPosts = async () => {
  try {
    const response = await fetch('/api/blog/posts?page=1&pageSize=10');
    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Posts:', data.data.posts);
    console.log('Total:', data.data.total);
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**Get Single Post:**
```javascript
const getPost = async (slug) => {
  try {
    const response = await fetch(`/api/blog/posts/${slug}`);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Post:', data.data);
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**Update Post:**
```javascript
const updatePost = async (slug) => {
  try {
    const response = await fetch(`/api/blog/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Updated Title',
        content: 'Updated content...',
        excerpt: 'Updated excerpt',
        category: 'Technology',
        tags: ['updated'],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Post updated:', data.data);
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**Delete Post:**
```javascript
const deletePost = async (slug) => {
  try {
    const response = await fetch(`/api/blog/posts/${slug}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Post deleted');
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**Upload Image:**
```javascript
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/blog/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.error);
      return;
    }

    console.log('Image URL:', data.data.url);
    return data.data.url;
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

### Using cURL

**Create a Blog Post:**
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the full content...",
    "excerpt": "Brief summary",
    "category": "Technology",
    "tags": ["javascript"],
    "featured_image": "https://example.com/image.jpg"
  }'
```

**Get All Posts:**
```bash
curl http://localhost:3000/api/blog/posts?page=1&pageSize=10
```

**Get Single Post:**
```bash
curl http://localhost:3000/api/blog/posts/my-first-blog-post
```

**Delete Post:**
```bash
curl -X DELETE http://localhost:3000/api/blog/posts/my-first-blog-post
```

### Using Postman

1. **Create POST request** to `/api/blog/posts`
2. Set **Content-Type** to `application/json`
3. Add request body with blog post data
4. Click **Send**

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | Success (GET, PUT, DELETE) |
| 201  | Created (POST) |
| 400  | Bad Request (missing/invalid data) |
| 401  | Unauthorized (not logged in) |
| 403  | Forbidden (permission denied) |
| 404  | Not Found |
| 500  | Internal Server Error |

---

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Always check the `success` field and handle errors appropriately in your client code.

---

## Security Features

✅ **Authentication Required**: All write operations require Supabase authentication
✅ **Authorization**: Users can only edit/delete their own posts
✅ **Input Validation**: Request body is validated
✅ **File Validation**: Images are validated for type and size
✅ **CSRF Protection**: Built-in Next.js protection
✅ **Rate Limiting**: Consider implementing with middleware if needed

---

## Setup Instructions

### 1. Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Supabase Database Setup

Run these SQL queries in your Supabase dashboard:

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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 1
);

-- Create index for slug
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);

-- Create storage bucket for blog images
-- Go to Storage > Buckets > Create new bucket named "blog-storage"
-- Make it public for image serving

-- Set up RLS policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public posts are readable" ON public.blog_posts
  FOR SELECT USING (published = true);

-- Users can read their own unpublished posts
CREATE POLICY "Users can read own posts" ON public.blog_posts
  FOR SELECT USING (auth.uid() = author_id);

-- Users can create posts
CREATE POLICY "Users can create posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON public.blog_posts
  FOR DELETE USING (auth.uid() = author_id);
```

### 3. Install Dependencies

```bash
npm install @supabase/ssr
```

---

## Pagination

All list endpoints support pagination via query parameters:

```
GET /api/blog/posts?page=2&pageSize=5
```

Response includes:
- `posts`: Array of blog posts
- `total`: Total number of posts
- `page`: Current page number
- `pageSize`: Items per page

---

## Rate Limiting

Currently not implemented. Consider adding support later using middleware like `next-rate-limit`.

---

## Future Enhancements

- [ ] Comments system
- [ ] Search functionality
- [ ] Draft/published states
- [ ] Schedule blog posts
- [ ] SEO optimization
- [ ] Analytics tracking
- [ ] Email notifications
- [ ] Social sharing
