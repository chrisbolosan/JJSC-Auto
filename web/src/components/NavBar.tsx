'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
type NavLink = { href: string; label: string };

type NavBarProps = {
  brand?: string;
  links?: NavLink[];
  homeHREF?: string;
  showCart?: boolean;
};

const defaultLinks: NavLink[] = [
  { href: '/allproducts', label: 'Shop Parts' }
];

export default function NavBar({
  brand = 'JJSC Auto',
  links = defaultLinks,
  homeHREF = '/',
  showCart = true,
}: NavBarProps) {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathName === href || pathName.startsWith(`${href}/`);
  }
  return (
    <header className="bg-zinc-900 text-white">
      <div className="h-1 bg-brand" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={homeHREF}
          onClick={() => setMenuOpen(false)}
          className="text-xl font-extrabold uppercase tracking-wide"
        >
          <span className="rounded-sm bg-brand px-1.5 py-0.5 text-ink">
            JJSC
          </span>
          <span>{brand.replace(/^JJSC\s*/i, '') || 'Auto'}</span>
        </Link>
        {showCart && (
          <Link
            href="/checkout"
            aria-label="Cart"
            title="Cart"
            className="rounded p-2 transition-colors hover:text-brand"
          >
            <ShoppingCart size={24} aria-hidden="true" />
          </Link>
        )}
      </div>

      <nav className="flex-1">
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive(link.href)
                    ? 'text-brand'
                    : 'text-zinc-300 hover:bg-ink-soft hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
