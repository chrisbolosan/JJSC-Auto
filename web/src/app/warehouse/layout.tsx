import type { Metadata } from 'next';
import { Suspense } from 'react';
import SubNavigation from '@/components/SubNavigation';

const warehousePanels = [
  { href: '/warehouse', label: 'Dashboard' },
  { href: '/warehouse/labels', label: 'Labels' },
  { href: '/warehouse/receiving', label: 'Receiving' },
];

export const metadata: Metadata = {
  title: 'Warehouse | JJSC AUTO',
};
export default function WarehouseLayout({
  children,
}: LayoutProps<'/warehouse'>) {
  return (
    <div>
      <Suspense
        fallback={<div className="h-12 border-b border-line bg-surface" />}
      >
        <SubNavigation title="Warehouse" links={warehousePanels} />
      </Suspense>
      <main>{children}</main>
    </div>
  );
}
