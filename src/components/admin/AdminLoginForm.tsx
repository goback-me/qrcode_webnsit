'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClientInstance } from '@/lib/supabase.client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2, Mail, Lock } from 'lucide-react';

export function AdminLoginForm() {
  const router = useRouter();
  const supabase = createBrowserClientInstance();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please enter email and password');
      }

      let result;

        result = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          throw result.error;
        }

      // Clear form
      setFormData({ email: '', password: '' });

      // Redirect to create page
      router.push('/admin/blog/create');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
        </div>

        {error && (
          <Card className="border-red-500 bg-red-50">
            <div className="flex gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          </Card>
        )}

        <Card className="border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-900 font-semibold">
                Email Address
              </Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  required
                  className="pl-10 border-gray-300 text-gray-900"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-900 font-semibold">
                Password
              </Label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="pl-10 border-gray-300 text-gray-900"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold"
            >
              Sign In
            </Button>
          </form>
        </Card>

        {/* Info */}
        <Card className="border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This is the admin area. Only authorized users can create blog posts. Your credentials are secure and encrypted.
          </p>
        </Card>
      </div>
    </div>
  );
}
