# 🚀 Blog System - Quick Start Guide

## What's Been Set Up

Your Next.js application now has a complete, secure blog system with:

✅ **Secure Authenticated API** with Supabase  
✅ **Beautiful Blog UI** with Tailwind CSS & Shadcn  
✅ **Database** for storing blog posts  
✅ **Image Upload** to cloud storage  
✅ **Blog Listing & Detail Pages**  
✅ **Form for creating posts** with rich validation  

---

## File Structure Created

```
src/
├── app/
│   ├── api/
│   │   └── blog/
│   │       ├── posts/
│   │       │   ├── route.ts              ← GET all posts, POST new post
│   │       │   └── [slug]/route.ts       ← GET, PUT, DELETE single post
│   │       └── upload/
│   │           └── route.ts              ← Image upload endpoint
│   └── blog/
│       ├── page.tsx                      ← Blog listing page
│       ├── create/page.tsx               ← Create post form
│       └── [slug]/page.tsx               ← Single post view
├── components/blog/
│   ├── CreateBlogForm.tsx                ← Post creation form
│   ├── BlogList.tsx                      ← Blog grid/list
│   └── BlogDetail.tsx                    ← Single post display
├── lib/
│   ├── supabase.server.ts                ← Server-side Supabase client
│   └── supabase.client.ts                ← Client-side Supabase client
├── types/
│   └── blog.ts                           ← TypeScript types
└── middleware.ts                         ← Auth middleware
```

---

## 🔧 Setup Steps (3 mins)

### 1. Create Supabase Account
- Go to https://supabase.com
- Sign up (free)
- Create new project

### 2. Add Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Create Database Tables
Copy [BLOG_SETUP_GUIDE.md](./BLOG_SETUP_GUIDE.md) SQL and run in Supabase SQL Editor

### 4. Create Storage Bucket
In Supabase:
- Storage > Create Bucket > Name: `blog-storage` > Make Public

### 5. Install Dependencies
```bash
npm install @supabase/ssr
```

### 6. Start Your Dev Server
```bash
npm run dev
```

---

## 📍 URL Routes

| Route | Purpose | Authentication |
|-------|---------|-----------------|
| `/blog` | Blog listing page | Public |
| `/admin/blog/login` | Admin login/signup | Public |
| `/admin/blog/create` | Create new post form | Admin only |
| `/blog/[slug]` | View single blog post | Public |

---

## 🔌 API Endpoints

### Create Blog Post
```bash
POST /api/blog/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "Post content here...",
  "excerpt": "Brief summary",
  "category": "Technology",
  "tags": ["javascript", "web"],
  "featured_image": "https://example.com/image.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { /* post object */ },
  "message": "Blog post created successfully"
}
```

### Get All Posts
```bash
GET /api/blog/posts?page=1&pageSize=10&category=Technology
```

### Get Single Post
```bash
GET /api/blog/posts/my-post-slug
```

### Update Post
```bash
PUT /api/blog/posts/my-post-slug
Content-Type: application/json

{ /* updated post data */ }
```

### Delete Post
```bash
DELETE /api/blog/posts/my-post-slug
```

### Upload Image
```bash
POST /api/blog/upload
Content-Type: multipart/form-data

file: <image file>
```

---

## 💻 JavaScript Examples

### Create a Post
```javascript
async function createPost() {
  const response = await fetch('/api/blog/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'My Post',
      content: 'Content here...',
      excerpt: 'Summary',
      category: 'Technology',
      tags: ['react'],
    }),
  });
  const data = await response.json();
  console.log(data);
}
```

### Get All Posts
```javascript
async function getPosts() {
  const response = await fetch('/api/blog/posts?page=1');
  const data = await response.json();
  console.log(data.data.posts);
}
```

### Get Single Post
```javascript
async function getPost(slug) {
  const response = await fetch(`/api/blog/posts/${slug}`);
  const data = await response.json();
  console.log(data.data);
}
```

### Upload Image
```javascript
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/blog/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  console.log(data.data.url); // Image URL
}
```

---

## 🔒 Security Features

✅ **Authentication Required** - Only logged-in users can create/edit/delete  
✅ **Authorization** - Users can only modify their own posts  
✅ **Input Validation** - All requests validated  
✅ **File Validation** - Images checked for type & size (5MB max)  
✅ **Row Level Security** - Database policies enforce access control  

---

## 📚 Full Documentation

For detailed API documentation and advanced setup: [BLOG_API_DOCUMENTATION.md](./BLOG_API_DOCUMENTATION.md)

For step-by-step setup: [BLOG_SETUP_GUIDE.md](./BLOG_SETUP_GUIDE.md)

---

## 🎨 UI Features

### Blog Listing Page
- Grid layout for blog posts
- Featured images
- Category badges
- Tags display
- Reading time estimate
- View count
- Pagination

### Create Post Form
- Beautiful dark theme
- Image upload with preview
- Form validation
- Rich content textarea
- Category selector
- Tag input
- Error messages

### Blog Detail Page
- Full featured image
- Author info
- Meta data (date, views, read time)
- Formatted content display
- Back button

---

## 🐛 Troubleshooting

**"Unauthorized" error?**
- Make sure you're logged in to Supabase
- Check that `.env.local` variables are correct

**"Failed to fetch posts"?**
- Verify database table exists
- Check RLS policies are created
- Look at browser console for details

**"Failed to upload image"?**
- Verify `blog-storage` bucket exists
- Make sure bucket is public
- Check file is under 5MB

**Posts not showing?**
- Verify `published = true` in database
- Check RLS policies allow SELECT
- Ensure posts have valid `author_id`

---

## 🎯 Next Steps

1. Complete Supabase setup
2. Visit `/blog` to see the blog page
3. Click "Write Post" to create your first post
4. Integrate Supabase auth UI for login/signup

---

## 📖 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🆘 Need Help?

Check these files in order:
1. This file (quick overview)
2. [BLOG_SETUP_GUIDE.md](./BLOG_SETUP_GUIDE.md) (detailed setup)
3. [BLOG_API_DOCUMENTATION.md](./BLOG_API_DOCUMENTATION.md) (API reference)
4. Supabase documentation

---

**Happy blogging! 🎉**
