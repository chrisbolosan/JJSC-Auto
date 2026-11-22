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
            (p.description ?? '').toLowerCase().includes(param),
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
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
      <section className="lg:col-span-2">
        <label
          htmlFor="part-search"
          className="block text-sm font-bold uppercase tracking-wide text-ink"
        >
          Find part
        </label>
        <input
          id="part-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex: Battery"
          className="input mt-2"
          autoComplete="off"
        />

        {param && (
          <ul className="mt-2 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {matches.length === 0 && (
              <li className="px-3 py-3 text-sm text-metal">No parts match.</li>
            )}

            {matches.map((p) => (
              <li key={p.number}>
                <button
                  type="button"
                  onClick={() => pickPart(p)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                >
                  <span>
                    <span className="font-mono text-metal">#{p.number}</span>{' '}
                    {p.description}
                  </span>
                  <span className="whitespace-nowrap text-xs text-metal">
                    {p.quantity} on hand
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {selected && (
          <form onSubmit={receive} className="card mt-6 p-5 hover:shadow-none">
            <div className="flex items-start gap-4">
              {selected.pictureURL && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.pictureURL}
                  alt={selected.description}
                  className="h-20 w-20 shrink-0 rounded bg-surface object-contain"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-metal">
                  #{selected.number}
                </p>
                <p className="font-bold text-ink">{selected.description}</p>
                <p className="mt-1 text-sm text-metal">
                  Currently on hand:{' '}
                  <strong className="text-ink">{selected.quantity}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="shrink-0 text-xs font-bold uppercase tracking-wide text-metal underline-offset-4 hover:text-ink hover:underline"
              >
                Change part
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <div>
                <label
                  htmlFor="qty"
                  className="block text-sm font-bold uppercase tracking-wide text-ink"
                >
                  Quantity received
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max="10000"
                  step="1"
                  required
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="input mt-2 w-32"
                />
              </div>
              <button
                type="submit"
                disabled={!qty || saving}
                className="btn-primary"
              >
                {saving ? 'Saving...' : 'Receive'}
              </button>
            </div>
          </form>
        )}

        {message && (
          <p
            role="status"
            className={`mt-4 rounded border-l-4 px-3 py-2 text-sm ${
              isError
                ? 'border-warning bg-warning text-warning'
                : 'border-ok bg-gray-800 text-ok'
            }`}
          >
            {message}
          </p>
        )}
      </section>

      <section className="lg:col-span-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
          Recently received
        </h2>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-metal">Nothing received yet</p>
        ) : (
          <div className="table-wrap mt-2">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-metal">
                <tr>
                  <th className="px-3 py-2">When</th>
                  <th className="px-3 py-2">Part</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2 text-right">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-3 py-2 text-metal">
                      {new Date(row.received_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 font-mono">#{row.part_number}</td>
                    <td className="px-3 py-2">{row.description}</td>
                    <td className="px-3 py-2 text-right font-bold text-ok">
                      +{row.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
