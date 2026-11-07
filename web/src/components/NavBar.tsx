'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = { href: string; label: string };

type NavBarProps = {
  brand?: string;
  links?: NavLink[];
};

const defaultLinks: NavLink[] = [
  { href: '/allproducts', label: 'Shop Parts' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/warehouse', label: 'Warehouse' },
  { href: '/admin', label: 'Admin' },
];

export default function NavBar({
  brand = 'JJSC Auto',
  links = defaultLinks,
}: NavBarProps) {
  const pathName = usePathname();

  return (
    <header className="bg-zinc-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-extrabold uppercase tracking-wide"
        >
          {brand}
        </Link>
        <Link href="/checkout" className="text-sm hover:text-red-400">
          Cart
        </Link>
      </div>

      <nav className="border-t border-zinc-700">
        <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 text-sm">
          {links.map((link) => {
            const isActive =
              pathName === link.href || pathName.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block whitespace-nowrap border-b-2 py-2 ${
                    isActive
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
