import type { Metadata } from 'next';
import Link from 'next/link';

const adminPanels = [
  { href: '/admin', section: 'Dashboard' },
  { href: '/admin/shipping', section: 'Shipping' },
];

export const metadata: Metadata = {
  title: 'Admin | JJSC AUTO',
};
export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <div>
      <nav>
        {adminPanels.map((panel) => (
          <Link key={panel.href} href={panel.href}>
            {panel.section}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
