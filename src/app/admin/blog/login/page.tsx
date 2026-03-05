import { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | QR Code Generator',
  description: 'Admin login for creating blog posts.',
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
