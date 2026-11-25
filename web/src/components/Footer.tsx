import Link from 'next/link';

const shopLinks = [
  { href: '/allproducts', label: 'Shop Parts' },
  { href: '/checkout', label: 'Cart & Checkout' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-zinc-400">
      <div className="h-1 bg-brand" />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <Link
            href="/"
            className="text-xl font-extrabold uppercase tracking-wide text-white"
          >
            <span className="rounded-sm bg-brand px-1.5 py-0.5 text-ink">
              JJSC
            </span>
            <span>Auto</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm">
            Quality auto parts, shipped straight to your door.
          </p>
        </div>

        <nav aria-label="Footer" className="sm:justify-self-end">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
            Shop
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
