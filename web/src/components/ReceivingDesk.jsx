'use client';

import { useEffect, useState } from 'react';

function hello() {
  console.log('submit placeholder');
}
export default function ReceivingTable() {
  const [search, setSearch] = useState('');
  const [recent, setRecent] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const [productsRes, recentRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/receiving'),
        ]);

        const productsData = await productsRes.json();
        const recentData = await recentRes.json();
        console.log('im productsDatareceiving', productsData);
        console.log('imrecent=====', recentData);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setRecent(Array.isArray(recentData) ? recentData : []);
      } catch {
        setIsError(true);
        setMessage('Issue loading parts. Reload page.');
      }
    }
    load();
  }, []);

  const param = search.trim().toLowerCase();
  const matches = param
    ? products
        .filter(
          (p) =>
            String(p.number).includes(param) ||
            p.description.toLowerCase().includes(param),
        )
        .slice(0, 10)
    : [];

  function pickPart(part) {
    setSelected(part);
    setSearch('');
    setQty('');
    setMessage('');
  }

  async function receive(e) {
    e.preventDefault();
    setMessage('');
    try {
      const results = await fetch('/api/receiving', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partNumber: selected.number, quantity: qty }),
      });

      const data = await results.json();
      console.log('resultsdata', data);

      if (!results.ok) {
        setIsError(true);
        setMessage(`Error ${data.error}`);
        return;
      }
      setIsError(false);
      setMessage(data.message);

      setProducts((list) =>
        list.map((p) =>
          p.number === selected.number ? { ...p, quantity: data.onHand } : p,
        ),
      );

      setSelected({ ...selected, quantity: data.onHand });
      setQty('');

      const recentResponse = await fetch('/api/receiving');
      const recentData = await recentResponse.json();

      if (Array.isArray(recentData)) {
        setRecent(recentData);
      }
    } catch {
      setIsError(true);
      setMessage('Error: db server issue receive request');
    }
  }

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

      {param && (
        <ul className="mt-2 divide-y rounded border border-zinc-200">
          {matches.length === 0 && (
            <li className="px-3 py-2 text-sm text-zinc-500">No parts match.</li>
          )}

          {matches.map((p) => (
            <li key={p.number}>
              <button
                type="button"
                onClick={() => pickPart(p)}
                className="flex w-full justify-between gap-4 px-3 py-2 text-left hover:bg-zinc-100"
              >
                <span>
                  <span className="font-mono text-zinc-500">#part number</span>{' '}
                  {/* part description */}
                  {p.description}
                </span>
                <span className="whitespace-nowrap text-sm text-zinc-600">
                  {p.quantity} on hand
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

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
