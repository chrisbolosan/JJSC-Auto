'use client';

import { useEffect, useState } from 'react';

export default function ReceivingTable() {
  const [search, setSearch] = useState('');
  const [recent, setRecent] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState('');
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    async function load() {
      try {
        const [productsRes, recentRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/receiving'),
        ]);

        const productsData = await productsRes.json();
        const recentData = await recentRes.json();
        // console.log('im productsDatareceiving', productsData);
        // console.log('imrecent=====', recentData);
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
    setSaving(true);
    setMessage('');
    try {
      const results = await fetch('/api/receiving', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partNumber: selected.number, quantity: qty }),
      });

      const data = await results.json();

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
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6 mx-auto w-full max-w-4xl px-4 py-9 border border-red-500">
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
                  <span className="font-mono text-zinc-500">#{p.number}</span>{' '}
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
      {selected && (
        <form
          onSubmit={receive}
          className="mt-6 rounded border border-zinc-300 bg-zinc-50 p-4"
        >
          {selected.pictureURL && (
            <div className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.pictureURL}
                alt={selected.description}
                className="h-20 w-20 rounded object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-black">
              #{selected.number} {selected.description}
            </p>
            <p className="text-sm text-zinc-600">
              Currently on hand: <strong>{selected.quantity}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="flex flex-col text-sm font-semibold bg-red-500 p-4 rounded-2xl"
          >
            Change part
          </button>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <label className=" text-black flex flex-col text-sm font-semibold ">
              Quantity received
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              required
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="mt-1 w-32 rounded border border-zinc-300 px-3 py-2 font-normal"
            />
            <button
              type="submit"
              disabled={!qty || saving}
              className="bg-yellow-300 p-4 rounded-2xl text-black"
            >
              {saving ? 'Saving' : 'Receive'}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p
          className={`mt-4 rounded px-3 py-2 text-sm ${
            isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {message}
        </p>
      )}
      <h2> Recently received</h2>
      {recent.length === 0 ? (
        <p>Nothing received yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-zinc-600">
              <tr>
                <th className="py-2 pr-4">Part</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 text-right">Qty</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">
                    {new Date(row.received_at).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4 ">#{row.part_number}</td>
                  <td className="py-2 pr-4">{row.description}</td>
                  <td className="py-2 text-right">+{row.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
