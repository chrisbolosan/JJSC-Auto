import type { Metadata } from 'next';
import Link from 'next/link';

//typescript dont touch
export const metadata: Metadata = {
  title: 'Admin | JJSC AUTO',
};
export default function AdminLayout({ children }: LayoutProps<'./admin'>) {
  return (
    <div>
      <nav>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/shipping">Shipping</Link>
      </nav>

      <main>{children}</main>
    </div>
  );
}
