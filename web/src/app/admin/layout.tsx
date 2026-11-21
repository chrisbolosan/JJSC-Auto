import type { Metadata } from 'next';
import { Suspense } from 'react';
import SubNavigation from '@/components/SubNavigation';

const adminPanels = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/shipping', label: 'Shipping' },
];

export const metadata: Metadata = {
  title: 'Admin | JJSC AUTO',
};

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <div>
      <Suspense
        fallback={<div className="h-12 border-b border-line bg-surface"></div>}
      >
        <SubNavigation title="Admin" links={adminPanels} />
      </Suspense>
      <main>{children}</main>
    </div>
  );
}
