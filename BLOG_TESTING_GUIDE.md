# API Testing Guide - Using cURL

This guide shows you how to test the blog API using cURL commands. You can run these in PowerShell, terminal, or any command-line interface.

## Prerequisites

- Your Next.js app running on `http://localhost:3000`
- Supabase set up and database created
- A user account (optional for read operations, required for write operations)

---

## 1️⃣ GET ALL BLOG POSTS

**Basic request (first page, 10 items):**
```bash
curl http://localhost:3000/api/blog/posts
```

**With pagination:**
```bash
curl "http://localhost:3000/api/blog/posts?page=2&pageSize=5"
```

**Filter by category:**
```bash
curl "http://localhost:3000/api/blog/posts?category=Technology&page=1&pageSize=10"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "My First Post",
        "slug": "my-first-post",
        "excerpt": "This is a brief summary",
        "author": "User Name",
        "category": "Technology",
        "tags": ["javascript"],
        "created_at": "2024-03-06T10:00:00Z",
        "views": 15,
        "reading_time": 5
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 10
  }
}
```

---

## 2️⃣ GET SINGLE BLOG POST

```bash
curl http://localhost:3000/api/blog/posts/my-first-post
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My First Post",
    "slug": "my-first-post",
    "content": "Full post content here...",
    "excerpt": "Brief summary",
    "author": "User Name",
    "category": "Technology",
    "tags": ["javascript"],
    "featured_image": "https://example.com/image.jpg",
    "created_at": "2024-03-06T10:00:00Z",
    "updated_at": "2024-03-06T10:00:00Z",
    "views": 16,
    "reading_time": 5
  }
}
```

Note: View count increments each time you fetch a post.

---

## 3️⃣ CREATE NEW BLOG POST

**⚠️ Requires authentication - must be logged in**

### Basic Create:
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Blog Post",
    "content": "This is the main content of my blog post. It can be quite long and contain multiple paragraphs.",
    "excerpt": "A brief summary of the post",
    "category": "Technology",
    "tags": ["javascript", "nextjs", "web"]
  }'
```

### With Featured Image:
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post with Image",
    "content": "Main content here...",
    "excerpt": "Summary",
    "category": "Tutorial",
    "tags": ["react"],
    "featured_image": "https://example.com/my-image.jpg"
  }'
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "title": "My Awesome Blog Post",
    "slug": "my-awesome-blog-post",
    "content": "...",
    "excerpt": "...",
    "author": "Your Name",
    "author_id": "your-uuid",
    "category": "Technology",
    "tags": ["javascript", "nextjs", "web"],
    "created_at": "2024-03-06T12:00:00Z",
    "updated_at": "2024-03-06T12:00:00Z",
    "published": true,
    "views": 0,
    "reading_time": 3
  },
  "message": "Blog post created successfully"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Unauthorized: Please log in to create a blog post"
}
```

---

## 4️⃣ UPDATE BLOG POST

**⚠️ Requires authentication - must be post author**

```bash
curl -X PUT http://localhost:3000/api/blog/posts/my-awesome-blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content here...",
    "excerpt": "Updated summary",
    "category": "Tutorial",
    "tags": ["javascript", "nextjs", "updated"]
  }'
```

**Success Response (200 OK):**
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

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "error": "Unauthorized: You can only edit your own posts"
}
```

---

## 5️⃣ DELETE BLOG POST

**⚠️ Requires authentication - must be post author**

```bash
curl -X DELETE http://localhost:3000/api/blog/posts/my-awesome-blog-post
```

**Success Response (200 OK):**
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

## 6️⃣ UPLOAD IMAGE

**⚠️ Requires authentication**

### Using PowerShell (Windows):
```powershell
$filePath = "C:\Users\YourName\Pictures\my-image.jpg"
$file = @{file = Get-Item -LiteralPath $filePath | Get-Content -AsByteStream -ReadCount 0}

Invoke-WebRequest -Uri "http://localhost:3000/api/blog/upload" `
  -Method Post `
  -Form $file
```

### Using cURL (Linux/Mac):
```bash
curl -X POST http://localhost:3000/api/blog/upload \
  -F "file=@/path/to/your/image.jpg"
```

### Using cURL (Windows PowerShell):
```powershell
$headers = @{'Content-Type' = 'multipart/form-data'}
curl.exe -X POST http://localhost:3000/api/blog/upload `
  -F "file=@C:\path\to\your\image.jpg"
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "url": "https://xxxxxxxxxxx.supabase.co/storage/v1/object/public/blog-storage/blog-images/user-id-1234567.jpg",
    "path": "blog-images/user-id-1234567.jpg"
  },
  "message": "Image uploaded successfully"
}
```

**Use the URL in your blog post:**
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post with Featured Image",
    "content": "Content here...",
    "excerpt": "Summary",
    "category": "Technology",
    "tags": ["image"],
    "featured_image": "https://xxxxxxxxxxx.supabase.co/storage/v1/object/public/blog-storage/blog-images/user-id-1234567.jpg"
  }'
```

---

## 🧪 Testing Scenarios

### Scenario 1: Create Post and View It

1. **Create post:**
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "Test content",
    "excerpt": "Test",
    "category": "Test",
    "tags": ["test"]
  }'
```
Save the `slug` from response (should be `test-post`)

2. **View the post:**
```bash
curl http://localhost:3000/api/blog/posts/test-post
```

3. **Check views increased:**
```bash
curl http://localhost:3000/api/blog/posts/test-post
```
Notice: `views: 2`

### Scenario 2: Create and Update Post

1. **Create:**
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Original Title",
    "content": "Original content",
    "excerpt": "Original",
    "category": "News",
    "tags": ["news"]
  }'
```
slug: `original-title`

2. **Update:**
```bash
curl -X PUT http://localhost:3000/api/blog/posts/original-title \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "excerpt": "Updated",
    "category": "News",
    "tags": ["news", "updated"]
  }'
```

3. **Verify:**
```bash
curl http://localhost:3000/api/blog/posts/original-title
```

### Scenario 3: Error Handling

1. **Missing required field:**
```bash
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Missing content"
  }'
```
Response: `400 - Missing required fields`

2. **Post not found:**
```bash
curl http://localhost:3000/api/blog/posts/nonexistent-post
```
Response: `404 - Blog post not found`

3. **Unauthorized:**
```bash
curl -X DELETE http://localhost:3000/api/blog/posts/other-users-post
```
Response: `403 - You can only delete your own posts`

---

## 📊 Common cURL Parameters

| Parameter | Purpose |
|-----------|---------|
| `-X POST` | Set HTTP method to POST |
| `-X PUT` | Set HTTP method to PUT |
| `-X DELETE` | Set HTTP method to DELETE |
| `-H` | Add header |
| `-d` | Send data (for POST/PUT) |
| `-F` | Send form data (for file uploads) |
| `-v` | Verbose (show all details) |
| `-i` | Include response headers |

---

## 🔧 Tips & Tricks

### Pretty Print JSON Response:

**PowerShell:**
```powershell
curl http://localhost:3000/api/blog/posts | ConvertFrom-Json | ConvertTo-Json -Depth 100
```

**Linux/Mac (with jq):**
```bash
curl http://localhost:3000/api/blog/posts | jq '.'
```

### Save Response to File:

```bash
curl http://localhost:3000/api/blog/posts > posts.json
```

### See Request and Response Headers:

```bash
curl -v http://localhost:3000/api/blog/posts
```

### Test with Custom Headers:

```bash
curl -H "Custom-Header: Value" http://localhost:3000/api/blog/posts
```

---

## ✅ Checklist for Testing

- [ ] GET all posts works
- [ ] GET single post works (and increments views)
- [ ] POST new post works (when logged in)
- [ ] PUT update post works (only own posts)
- [ ] DELETE post works (only own posts)
- [ ] Upload image works
- [ ] Use uploaded image URL in post
- [ ] Error handling works (invalid data, auth errors)
- [ ] Pagination works
- [ ] Category filtering works

---

## 🆘 Debugging Tips

**If requests fail:**

1. Check if server is running:
```bash
curl http://localhost:3000
```

2. Check if Supabase is connected:
- Verify `.env.local` has correct values
- Check browser console for errors

3. Check API route exists:
- Verify file paths match exactly
- Check for typos in route names

4. Check response headers:
```bash
curl -i http://localhost:3000/api/blog/posts
```

5. View detailed request/response:
```bash
curl -v http://localhost:3000/api/blog/posts
```

---

**Happy Testing! 🚀**
