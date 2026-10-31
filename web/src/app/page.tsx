'use client';
// import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import defaultHomepage from './default_homepage.json'; //temp homepage with route links
//Can also import json file and call the variables since it's just key/value pairs
// const sections = [
//   {
//     href: '/allproducts',
//     title: 'Shop Parts',
//     description:
//       'Browse the current catalog, check a stock, and/or add parts to your cart.',
//   },
//   {
//     href: '/checkout',
//     title: 'Checkout',
//     description: 'Review customer order',
//   },
//   {
//     href: '/warehouse',
//     title: 'Warehouse',
//     description: 'Warehouse information logistics and print orders',
//   },
//   {
//     href: '/admin/orders',
//     title: 'Admin',
//     description: 'Set rates and search orders',
//   },
// ];

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  function handleClick() {
    setShowMessage((prev) => !prev);
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
          onClick={handleClick}
        >
          Click Me
        </button>
        {showMessage && <p className="mt-4 text-zinc-500">Bingo Bango!</p>}
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
