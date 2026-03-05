# Environment Variables Setup

This file explains how to set up your environment variables for the blog system to work properly.

## 📝 Create `.env.local`

Create a file named `.env.local` in the root directory of your project:

```
c:\Users\Lenovo\Documents\Adeel\Client\Saas\qr-gen\qrcode_webnsit\.env.local
```

## 🔑 Environment Variables

Copy and paste these into your `.env.local` file, then fill in your Supabase credentials:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

---

## 🔍 How to Get Your Supabase Credentials

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Sign Up"
3. Create account with email or GitHub
4. Verify email

### Step 2: Create New Project
1. Click "New Project"
2. Fill in project details:
   - **Name:** Your project name (e.g., "qr-gen-blog")
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to you (e.g., "US East")
3. Click "Create new project"
4. Wait for initialization (2-3 minutes)

### Step 3: Get API Keys
1. In Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** in left sidebar
3. You'll see:
   - **Project URL** → Copy this to `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (secret) → Copy this to `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Fill in `.env.local`

Your `.env.local` should look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdef123456.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4OTAwMDAwLCJleHAiOjE5Mzg0NjAwMDB9.XXXXXXXXXXXXXXXXXXXXXXXXXXXX
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2Nzg5MDAwMDAsImV4cCI6MTkzODQ2MDAwMH0.YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

---

## ⚠️ Important Security Notes

1. **Never commit `.env.local` to Git**
   - Add to `.gitignore`:
     ```
     .env.local
     .env.*.local
     ```

2. **Keep service role key secret**
   - `SUPABASE_SERVICE_ROLE_KEY` is private
   - Never share or expose it
   - Only use server-side

3. **anon key is public**
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is meant to be exposed
   - It has limited permissions (anon user only)
   - RLS policies protect your data

---

## 📋 Variable Explanation

### `NEXT_PUBLIC_SUPABASE_URL`
- **What it is:** Your Supabase project URL
- **Example:** `https://abcdef123456.supabase.co`
- **Copy from:** Supabase Settings → API → Project URL
- **Public:** Yes (safe to expose)

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **What it is:** Anonymous/public access key
- **Example:** `eyJhbGci...` (very long string)
- **Copy from:** Supabase Settings → API → anon public
- **Public:** Yes (safe to expose)
- **Security:** RLS policies enforce permissions

### `SUPABASE_SERVICE_ROLE_KEY`
- **What it is:** Full admin/service access key
- **Example:** `eyJhbGci...` (very long string)
- **Copy from:** Supabase Settings → API → service_role (secret)
- **Public:** NO! Keep secret!
- **Used for:** Server-side operations only

---

## ✅ Verification Checklist

After setting up `.env.local`:

- [ ] File created at root: `.env.local`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` filled in
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` filled in
- [ ] `SUPABASE_SERVICE_ROLE_KEY` filled in
- [ ] `.env.local` added to `.gitignore`
- [ ] No sensitive keys in `.env.example`

---

## 🧪 Test Configuration

After setting up, test if environment variables are loaded:

### Using Node.js
```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### Using Next.js
```javascript
// In any Next.js file
import { createBrowserClientInstance } from '@/lib/supabase.client';
const supabase = createBrowserClientInstance();
// If no error, variables are loaded correctly
```

---

## 🚫 Common Mistakes

### ❌ Wrong Variable Names
```
# Wrong
SUPABASE_URL=xxx
SUPABASE_KEY=xxx

# Correct
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### ❌ Incomplete Keys
Make sure you copy the ENTIRE key, not just part of it

### ❌ Extra Spaces
```
# Wrong
NEXT_PUBLIC_SUPABASE_URL = https://...

# Correct
NEXT_PUBLIC_SUPABASE_URL=https://...
```

### ❌ Committed to Git
```bash
# Check if accidentally committed
git log --all --full-history -- ".env.local"

# Remove from history (if needed)
git filter-branch --tree-filter 'rm -f .env.local' HEAD
```

---

## 🔄 Update Environment Variables

When you need to change variables:

1. Update `.env.local`
2. Restart dev server:
   ```bash
   # Stop: Ctrl+C
   npm run dev  # Start again
   ```
3. Clear browser cache (optional)
4. Test the change

---

## 📚 Learn More

- [Supabase Environment Variables](https://supabase.com/docs/guides/api/keys)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth)

---

## 🆘 Troubleshooting

### Error: "Cannot find NEXT_PUBLIC_SUPABASE_URL"
- Check `.env.local` exists in root directory
- Verify variable names are correct
- Restart dev server
- Clear Node modules: `npm ci`

### Error: "Invalid Supabase URL"
- Verify URL format: `https://xxx.supabase.co`
- Check for extra spaces
- Copy entire URL

### Error: "Unauthorized" in API calls
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check RLS policies are set up (see BLOG_SETUP_GUIDE.md)
- Verify user is authenticated

### Variables not loading in production
- Set environment variables in your hosting platform
- Verify variable names match exactly
- Restart application

---

## 💾 Example `.env.local`

Here's a complete example (with fake values):

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3ODkwMDAwMCwiZXhwIjoxOTM4NDYwMDAwfQ.5K_VQz_I_9o0p9p0p0p0p0p0p0p0p0p0p0p0p0p0p0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjc4OTAwMDAwLCJleHAiOjE5Mzg0NjAwMDB9.6K_UQa_J_9n0o9n0n0n0n0n0n0n0n0n0n0n0n0n0n0
```

---

**That's it! You're ready to go! 🎉**

Continue with [BLOG_QUICK_START.md](./BLOG_QUICK_START.md) for setup.
