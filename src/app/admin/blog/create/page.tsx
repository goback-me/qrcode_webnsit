import { Metadata } from 'next';
import { AdminCreateBlogForm } from '@/components/admin/AdminCreateBlogForm';

export const metadata: Metadata = {
  title: 'Create Blog Post | QR Code Generator Admin',
  description: 'Create and publish a new blog post.',
};

export default function AdminCreateBlogPage() {
  return <AdminCreateBlogForm />;
}
