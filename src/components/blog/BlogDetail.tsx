'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface BlogDetailProps {
  slug: string;
}

export function BlogDetail({ slug }: BlogDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts/${slug}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch post');
        }

        setPost(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Post not found'}</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 border border-gray-200">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-blue-600">{post.category}</Badge>
            {post.tags &&
              post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tag}
                </Badge>
              ))}
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{post.reading_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>{post.views} views</span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <Card className="bg-gray-50 border-gray-200 p-6 mb-8">
          <p className="text-gray-700 text-lg italic">{post.excerpt}</p>
        </Card>

        {/* Content */}
        <Card className="bg-white border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-8 whitespace-pre-wrap text-base">
              {post.content}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
