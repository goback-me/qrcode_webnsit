# Blog Post Not Found - Debugging Guide

If you see "Blog post not found" when trying to view a created blog post, follow these steps:

## Step 1: Check Browser Console

1. Open your blog (`/blog`)
2. Create a new blog post
3. After creation, you'll be redirected to `/blog`
4. Click on the blog post
5. Open **Browser DevTools** (F12)
6. Go to **Console** tab
7. Look for log messages that show:
   - The slug being requested
   - Any fetch errors

## Step 2: Check Network Tab

1. Still on the blog post page with DevTools open
2. Go to **Network** tab
3. Look for the request to `/api/blog/posts/[slug]`
4. Check the response:
   - **Status 404**: Post not found in database
   - **Status 500**: Server error (check the error message)

## Step 3: Verify Blog Post in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Run this query to see all blog posts:

```sql
SELECT id, title, slug, author_id, published, created_at 
FROM blog_posts 
ORDER BY created_at DESC;
```

**Check:**
- ✅ Can you see your blog post?
- ✅ Is `published` set to `true`?
- ✅ Does the slug look correct (lowercase, no special characters)?

5. If the post exists, run this to verify the slug:

```sql
SELECT * FROM blog_posts 
WHERE slug = 'your-blog-title-here';
```

## Step 4: Check API Response Directly

1. Create a blog post and note the exact title
2. Get the expected slug (title in lowercase, no special chars, spaces as dashes)
3. Test the API directly by visiting this URL in your browser:

```
https://yoursite.com/api/blog/posts/expected-slug-here
```

**Expected responses:**
- **200 OK**: `{ "success": true, "data": { ...post... } }`
- **404 NOT FOUND**: `{ "success": false, "error": "Blog post not found" }`
- **500 ERROR**: Will show specific database error

## Step 5: Common Issues & Solutions

### Issue: "Missing slug value"
**Solution:** The slug might contain special characters or spaces that aren't being handled.

**Check:** Look at the browser console when creating the post. The slug should use only:
- Lowercase letters
- Numbers  
- Hyphens (-)
- No spaces, special characters, or accents

### Issue: Database error after upload
**Solution:** May be related to table structure or constraints.

**Check:** Run this in Supabase SQL Editor:

```sql
-- Check if blog_posts table exists and has correct columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
ORDER BY ordinal_position;
```

**Required columns:**
- `id` (UUID)
- `title` (VARCHAR)
- `slug` (VARCHAR, UNIQUE)
- `content` (TEXT)
- `excerpt` (TEXT)
- `published` (BOOLEAN)
- `author_id` (UUID)
- All other blog fields

### Issue: RLS Policy Blocking Access
**Solution:** Check Row Level Security policies.

**Check:** Run this query:

```sql
-- Check RLS policies on blog_posts
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
FROM pg_policies 
WHERE tablename = 'blog_posts';
```

**Should have policies for:**
- ✅ Public SELECT for `published = true`
- ✅ User SELECT for own posts
- ✅ User INSERT for creating posts

## Step 6: Check Next.js Build

If you've deployed (not local development):

1. Rebuild your Next.js project:
```bash
npm run build
```

2. Check for build errors related to blog routes

3. Rebuild and redeploy:
```bash
npm run build && npm start
```

## Step 7: Enable Debug Logging

The API routes now log detailed information. To see them:

**Local Development:**
- Check your terminal/console where you ran `npm run dev`
- Look for logs like: `"Fetching blog post with slug: my-title"`

**Deployed:**
- Check your hosting provider's logs
- Vercel: Deployments → Function Logs
- Other providers: Check their logging dashboards

## Quick Test Procedure

1. **Create a post** with title: `Test Post`
   - Expected slug: `test-post`

2. **Check database** for the post with slug `test-post`

3. **Test API** by visiting:
   ```
   /api/blog/posts/test-post
   ```

4. **Should see** post details in JSON response

5. **Then click** the blog post link from `/blog`

## If Still Not Working

**Collect this information and share:**

1. Exact title of blog post you created
2. Expected slug (what it should be)
3. Response from `/api/blog/posts/expected-slug`
4. Output of SQL query: `SELECT slug, published FROM blog_posts ORDER BY created_at DESC LIMIT 1;`

---

**Key Files to Check:**
- `/src/app/api/blog/posts/[slug]/route.ts` - GET endpoint
- `/src/app/api/blog/posts/route.ts` - POST endpoint (creation)
- `/src/components/blog/BlogDetail.tsx` - Detail component
- Supabase SQL Editor - Database queries

