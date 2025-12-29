'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthProvider } from '../lib/AuthContext';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  return (
    <AuthProvider>
      {/* Only show site header on non-admin pages */}
      {!isAdminPage && <Navbar />}

      <main>{children}</main>

      {/* Only show site footer on non-admin pages */}
      {!isAdminPage && <Footer />}
    </AuthProvider>
  );
}
