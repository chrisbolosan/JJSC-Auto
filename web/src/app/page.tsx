'use client';
// import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import defaultHomepage from './default_homepage.json'; //temp homepage with route links

export default function Home() {
  const [message, setMessage] = useState('');
  //make function fetch the message API from our backend
  async function fetchMessage() {
    if (message) {
      setMessage('');
      return;
    }
    //same app, so a relative path works on localhost, preview, and production
    const res = await fetch('/api/homepage/message');
    const data = await res.json();

    setMessage(data.message);
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase text-zinc-500">
        Temp home page with links
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {defaultHomepage.sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-zinc-200 p-5"
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{section.description}</p>
          </Link>
        ))}
        <p className="mt-12 text-sm text-zinc-500">
          Team JJSC Under Construction
        </p>
      </div>
      <div className="my-10">
        <button
          className="bg-red-500 p-5 rounded-2xl border border-amber-50"
          onClick={fetchMessage}
        >
          Click Me
        </button>
        {message && <p className="mt-4 text-zinc-500">{message}</p>}
      </div>
      <div>
        <iframe
          className="border-0"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=mjRISOd_PGKFihGK"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
}
