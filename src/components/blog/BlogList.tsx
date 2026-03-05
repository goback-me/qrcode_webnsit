'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface BlogListProps {
  category?: string;
}

export function BlogList({ category }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: '6',
          ...(category && { category }),
        });

        const response = await fetch(`/api/blog/posts?${params}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch posts');
        }

        setPosts(result.data.posts);
        setTotal(result.data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className="h-96 bg-gray-100 border-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No blog posts found</p>
      </div>
    );
  }

  const pageSize = 6;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-12">
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer group">
              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-600 hover:bg-blue-700">{post.category}</Badge>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="space-y-3 text-xs text-gray-500 border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.reading_time} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 disabled:opacity-50 hover:bg-gray-300 transition-colors font-medium"
          >
            Previous
          </button>
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                  page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 disabled:opacity-50 hover:bg-gray-300 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
