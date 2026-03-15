import { MetadataRoute } from "next";

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

type BlogApiPost = {
  slug?: string;
  updated_at?: string;
  created_at?: string;
};

async function getBlogPostsFromApi(): Promise<BlogApiPost[]> {
  const pageSize = 100;
  let page = 1;
  let total = 0;
  const allPosts: BlogApiPost[] = [];

  do {
    const response = await fetch(
      `${SITE_URL}/api/blog/posts?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      break;
    }

    const result = await response.json();
    const posts = (result?.data?.posts ?? []) as BlogApiPost[];
    total = Number(result?.data?.total ?? 0);

    allPosts.push(...posts);
    page += 1;
  } while (allPosts.length < total);

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPostsFromApi();

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