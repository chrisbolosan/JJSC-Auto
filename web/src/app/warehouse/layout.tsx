import type { Metadata } from 'next';
import Link from 'next/link';

const warehousePanels = [
  { href: '/warehouse', section: 'Dashboard' },
  { href: '/warehouse/labels', section: 'Labels' },
  { href: '/warehouse/receiving', section: 'Receiving' },
];

export const metadata: Metadata = {
  title: 'Warehouse | JJSC AUTO',
};
export default function WarehouseLayout({
  children,
}: LayoutProps<'/warehouse'>) {
  return (
    <div>
      <nav>
        {warehousePanels.map((panel) => (
          <Link key={panel.href} href={panel.href}>
            {panel.section}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
