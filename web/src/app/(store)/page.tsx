'use client';
import Card from '@/components/Card';
import defaultHomepage from './default_homepage.json';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            Shop our Black Friday Deals today!
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/allproducts" className="btn-primary">
                Shop parts
              </Link>
              <Link
                href="/checkout"
                className="btn-secondary border-white bg-transparent text-white hover:bg-white hover:text-ink"
              >
                View cart
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative ml-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-0 rotate-12 rounded-2xl bg-brand" />
              <div className="absolute inset-4 flex items-center justify-center rounded-2xl bg-ink-light">
                <span className="text-7xl font-black text-brand">JJSC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2 bg-brand" />
      </section>
      <section>
        <p className="text-sm font-semibold uppercase text-zinc-500">
          Categories{' '}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {defaultHomepage.sections.map((section) => (
            <Card
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
