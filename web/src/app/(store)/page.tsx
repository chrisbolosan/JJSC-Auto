'use client';
import Card from '@/components/Card';
import defaultHomepage from './default_homepage.json';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>left</div>

          <div className="">right</div>
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
          <p className="mt-12 text-sm text-zinc-500">
            Team JJSC Under Construction
          </p>
        </div>
      </section>
    </main>
  );
}
