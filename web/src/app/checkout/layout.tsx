import type { Metadata } from 'next';
import Link from 'next/link';

const checkoutPanels = [
  { href: '/checkout', section: 'Cart' },
  { href: '/checkout/billing', section: 'Billing' },
  { href: '/checkout/receipt', section: 'Receipt' },
];

export const metadata: Metadata = {
  title: 'Checkout | JJSC AUTO',
};
export default function CheckoutLayout({ children }: LayoutProps<'/checkout'>) {
  return (
    <div>
      <nav>
        {checkoutPanels.map((panel) => (
          <Link key={panel.href} href={panel.href}>
            {panel.section}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
