'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClientInstance } from '@/lib/supabase.client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AlertCircle, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

export function CreateBlogForm() {
  const router = useRouter();
  const supabase = createBrowserClientInstance();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: '',
    featured_image: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const response = await fetch('/api/blog/upload', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }

      setFeaturedImageUrl(result.data.url);
      setFormData(prev => ({ ...prev, featured_image: result.data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to create a blog post');
      }

      const response = await fetch('/api/blog/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          featured_image: formData.featured_image,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create blog post');
      }

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Technology',
        tags: '',
        featured_image: '',
      });
      setFeaturedImageUrl(null);

      // Redirect to blog page
      router.push('/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Blog Post</h1>
          <p className="text-gray-400">Share your thoughts and ideas with the world</p>
        </div>

        {error && (
          <Card className="mb-6 border-red-500 bg-red-50 dark:bg-red-950/20">
            <div className="flex gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Featured Image */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <Label className="text-white mb-4 block font-semibold">Featured Image</Label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                      <p className="text-gray-400">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-300 font-medium">Click to upload or drag image</p>
                      <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
              {featuredImageUrl && (
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={featuredImageUrl}
                    alt="Featured image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Title */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <Label htmlFor="title" className="text-white font-semibold">
              Post Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your blog post title"
              required
              className="mt-3 bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
            />
          </Card>

          {/* Excerpt */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <Label htmlFor="excerpt" className="text-white font-semibold">
              Excerpt (Summary) *
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief description of your post (shown in blog list)"
              required
              rows={3}
              className="mt-3 bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
            />
          </Card>

          {/* Content */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <Label htmlFor="content" className="text-white font-semibold">
              Post Content *
            </Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here..."
              required
              rows={12}
              className="mt-3 bg-slate-700 border-slate-600 text-white placeholder:text-gray-500 font-mono text-sm"
            />
            <p className="text-gray-400 text-xs mt-2">
              Supports basic markdown formatting
            </p>
          </Card>

          {/* Category and Tags */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <Label htmlFor="category" className="text-white font-semibold">
                Category *
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-3 w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Technology</option>
                <option>Tutorial</option>
                <option>News</option>
                <option>Guide</option>
                <option>Other</option>
              </select>
            </Card>

            <Card className="p-6 bg-slate-800 border-slate-700">
              <Label htmlFor="tags" className="text-white font-semibold">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., next.js, react, web development"
                className="mt-3 bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
              />
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Blog Post'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
