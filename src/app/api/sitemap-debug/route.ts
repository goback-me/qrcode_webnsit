// app/api/sitemap-debug/route.ts
export const runtime = "nodejs";

import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: "Missing env vars", supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test 1: raw count of ALL blog posts
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true });

  // Test 2: your strict query
  const strict = await supabase
    .from("blog_posts")
    .select("slug, published, draft, is_indexed")
    .eq("published", true)
    .eq("draft", false)
    .eq("is_indexed", true)
    .limit(5);

  // Test 3: relaxed query
  const relaxed = await supabase
    .from("blog_posts")
    .select("slug, published, draft, is_indexed")
    .eq("published", true)
    .limit(5);

  return Response.json({
    totalRows: count,
    strictQuery: { data: strict.data, error: strict.error?.message },
    relaxedQuery: { data: relaxed.data, error: relaxed.error?.message },
  });
}