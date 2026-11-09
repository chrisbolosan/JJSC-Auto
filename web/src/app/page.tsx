'use client';
import Card from '@/components/Card';
import defaultHomepage from './default_homepage.json'; //temp homepage with route links

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase text-zinc-500">
        Temp home page with links
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
    </main>
  );
}
