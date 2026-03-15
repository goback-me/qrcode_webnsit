import { Metadata } from 'next';
import Link from 'next/link';
import { BlogList } from '@/components/blog/BlogList';
import Breadcrumb from '@/components/Breadcrumb';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genqrgenerator.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.genqrgenerator.com/blog' },
  ],
};

export const metadata: Metadata = {
  title: 'QR Code Generator Blog – Tips & Guides | GenQRGenerator',
  description: 'Explore tutorials, tips, and insights on QR code generators with logo, URL, and text. Learn to create QR codes online for free. Read our latest posts now!',
    alternates: {
    canonical: "https://www.genqrgenerator.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
  {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: 'Blog' }]} />
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
