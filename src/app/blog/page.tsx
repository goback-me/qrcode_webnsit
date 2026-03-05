import { Metadata } from 'next';
import Link from 'next/link';
import { BlogList } from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog | QR Code Generator',
  description: 'Read our latest blog posts about QR codes, web development, and technology insights.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600 text-lg">
            Insights, tutorials, and stories about QR codes and web development
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BlogList />
        </div>
      </div>
    </div>
  );
}
