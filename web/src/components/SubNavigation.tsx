'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SubNavLink = { href: string; label: string };

type SubNavProps = {
  title: string;
  links: SubNavLink[];
};

export default function SubNavigation({ title, links }: SubNavProps) {
  const pathName = usePathname();

  function isActive(href: string, index: number) {
    if (index === 0) return pathName === href;
    return pathName === href || pathName.startsWith(`${href}/`);
  }

  return (
    <nav
      aria-label={`${title} sections`}
      className="border-b border-line bg-surface"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4">
        <span className="hidden shrink-0 text-xs font-bold uppercase tracking-widest text-steel sm:inline">
          {title}
        </span>
        <ul className="flex gap-1">
          {links.map((link, index) => {
            const active = isActive(link.href, index);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block border-b-2 px-3 py-3 text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                    active
                      ? 'border-brand text-ink'
                      : 'border-transparent text-steel hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
