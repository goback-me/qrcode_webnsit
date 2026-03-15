import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genqrgenerator.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/products`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/bulk-qr-generator`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/help`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
];

type SitemapBlogPost = {
  slug: string | null;
  updated_at: string | null;
  created_at: string | null;
};

async function getBlogPostsForSitemap(): Promise<SitemapBlogPost[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const strictQuery = await supabase
    .from("blog_posts")
    .select("slug, updated_at, created_at")
    .eq("published", true)
    .eq("draft", false)
    .eq("is_indexed", true)
    .order("created_at", { ascending: false });

  if (!strictQuery.error && strictQuery.data && strictQuery.data.length > 0) {
    return strictQuery.data;
  }

  const relaxedQuery = await supabase
    .from("blog_posts")
    .select("slug, updated_at, created_at")
    .eq("published", true)
    .or("draft.eq.false,draft.is.null")
    .order("created_at", { ascending: false });

  if (relaxedQuery.error || !relaxedQuery.data) {
    return [];
  }

  return relaxedQuery.data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPostsForSitemap();

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(post.created_at ?? new Date().toISOString()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes];
}