import type { Metadata } from 'next';
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';

const staffDestinations = [
  { href: '/warehouse', label: 'Warehouse' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/admin', label: 'Admin' },
];

export const metadata: Metadata = {
  title: 'Staff | JJSC AUTO',
};

export default function StaffLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-ink" />}>
        <NavBar
          brand="JJSC Staff"
          links={staffDestinations}
          homeHref="/staff"
          showCart={false}
        />
      </Suspense>
      <div className="flex-1">{children}</div>
    </>
  );
}
