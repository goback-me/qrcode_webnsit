'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin login - blog creation is now admin-only
    router.push('/admin/blog/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to admin login...</p>
      </div>
    </div>
  );
}
