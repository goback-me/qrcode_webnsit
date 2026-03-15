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

  const sanitizeHtmlForDisplay = (rawHtml: string): string => {
    if (!rawHtml) return '';

    const container = document.createElement('div');
    container.innerHTML = rawHtml;
    const allowedTags = new Set([
      'p',
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'strong',
      'b',
      'em',
      'i',
      'u',
      'a',
      'blockquote',
    ]);

    const cleanNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        if (tagName === 'script' || tagName === 'style') {
          element.remove();
          return;
        }

        if (!allowedTags.has(tagName)) {
          const parent = element.parentNode;
          if (!parent) return;

          while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
          }
          parent.removeChild(element);
          return;
        }

        for (const attr of Array.from(element.attributes)) {
          const isSafeHref =
            tagName === 'a' &&
            attr.name === 'href' &&
            /^(https?:|mailto:|\/)/i.test(attr.value);

          if (!isSafeHref) {
            element.removeAttribute(attr.name);
          }
        }
      }

      for (const child of Array.from(node.childNodes)) {
        cleanNode(child);
      }
    };

    cleanNode(container);
    return container.innerHTML;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-10 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-48 sm:h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-10 px-4 sm:py-12 sm:px-6 lg:px-8">
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
    <div className="min-h-screen bg-white py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 sm:mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-56 sm:h-72 lg:h-96 w-full rounded-lg overflow-hidden mb-6 sm:mb-8 border border-gray-200">
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
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <Badge className="bg-blue-600">{post.category}</Badge>
            {post.tags &&
              post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tag}
                </Badge>
              ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4 sm:py-6">
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
        <Card className="bg-gray-50 border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">{post.excerpt}</p>
        </Card>

        {/* Content */}
        <Card className="bg-white border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="max-w-none">
            <div
              className="text-gray-700 text-[15px] sm:text-base leading-7 sm:leading-8 break-words
              [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight
              [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:leading-tight
              [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:leading-tight
              [&_p]:my-4 [&_p]:text-gray-700 [&_p]:leading-7 sm:[&_p]:leading-8
              [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:my-2
              [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
              [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-700"
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlForDisplay(post.content) }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
