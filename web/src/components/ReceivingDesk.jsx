'use client';

import { useEffect, useState } from 'react';

function hello() {
  console.log('submit placeholder');
}
export default function ReceivingTable() {
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    async function load() {
      try {
        const [productsRes, recentRes] = await Promise.all([
          fetch('/api/products'),
          fetch('api/receiving'),
        ]);

        const productsData = await productsRes.json();
        const recentData = await recentRes.json();
        console.log('im productsDatareceiving', productsData);
        console.log('imrecent=====', recentData);
      } catch {
        setIsError(true);
        setMessage('Issue loading parts. Reload page.');
      }
    }
    load();
  }, []);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-9 border border-red-500">
      <h1 className="mb-2 border border-amber-400">Receiving</h1>
      <p className="mb-6 text sm text-white ">
        {' '}
        Enter information to search part from the delivery
      </p>
      <label> Find part # or enter the description</label>
      <input
        id="part-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ex: battery fluid or 123"
        className="ml-4 border border-zinc-500 p-2 rounded"
        autoComplete="off"
      ></input>

      <ul className="mt-2 divide-y rounded border border-zinc-200">
        <li className="px-3 py-2 text-sm text-zinc-500">No parts match.</li>

        <li>
          <button
            type="button"
            className="flex w-full justify-between gap-4 px-3 py-2 text-left hover:bg-zinc-100"
          >
            <span>
              <span className="font-mono text-zinc-500">#part number</span> part
              description
            </span>
            <span className="whitespace-nowrap text-sm text-zinc-600">
              on hand
            </span>
          </button>
        </li>
      </ul>

      <form
        onSubmit={hello}
        className="mt-6 rounded border border-zinc-300 bg-zinc-50 p-4"
      >
        <div id="picture"> </div>
        {isError}
        {message}
      </form>
    </div>
  );
}
