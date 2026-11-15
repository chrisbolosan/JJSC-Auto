/* 
Jorge Ruiz
Citation: 
AI-Generated Code

Tool/Source:
Claude

Date:
11/11/2026

Prompt:
instead of this approach of using components can you format everything in a single page.tsx file 
and use this as a reference of how i want it:

Code/Resource Usage:
to display orders from a admin point of view so it retrieves the data from the db via api call

*/
'use client';
import { useEffect, useState } from 'react';
import ReturnButton from '@/components/returnButton';

export type OrderData = {
  id: number;
  status: string;
  created_at: string;
  customer_name: string;
  item_count: number;
  total: number;
};

const STATUSES = [
  { label: 'Pending', value: 'pending' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivery' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // search state
  const [status, setStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('/api/admin_orders')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: OrderData[]) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function clearFilters() {
    setStatus('all');
    setDateFrom('');
    setDateTo('');
    setMinPrice('');
    setMaxPrice('');
  }

  const visible = orders.filter((o) => {
    if (status !== 'all' && o.status?.toLowerCase() !== status) return false;

    const day = o.created_at.slice(0, 10); // YYYY-MM-DD
    if (dateFrom && day < dateFrom) return false;
    if (dateTo && day > dateTo) return false;

    if (minPrice !== '' && o.total < Number(minPrice)) return false;
    if (maxPrice !== '' && o.total > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Orders</h1>

      {/* Search panel */}
      <div className="mt-4 rounded border border-gray-300 p-4">
        <h2 className="mb-2 font-semibold">Search orders</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col text-sm">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 rounded border px-2 py-1"
            >
              <option value="all">All</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Date from
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-1 rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Date to
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-1 rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Min total ($)
            <input
              type="number"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            Max total ($)
            <input
              type="number"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 rounded border px-2 py-1"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-3 rounded border px-3 py-1 text-sm"
        >
          Clear filters
        </button>
      </div>

      {loading && <p className="mt-4">Loading orders...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="mt-4 text-sm text-gray-600">
            {visible.length} of {orders.length} orders
          </p>

          {visible.length === 0 ? (
            <p className="mt-6">No orders match your search.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 pr-4">Order</th>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Items</th>
                    <th className="py-2 pr-4">Total</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((o) => (
                    <tr key={o.id} className="border-b border-gray-200">
                      <td className="py-2 pr-4">ORD-{o.id}</td>
                      <td className="py-2 pr-4">{o.customer_name}</td>
                      <td className="py-2 pr-4">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4">{o.item_count}</td>
                      <td className="py-2 pr-4">${o.total.toFixed(2)}</td>
                      <td className="py-2">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="m-4">
                <ReturnButton
                  href="/admin"
                  label="LET'S GO!"
                  styles="bg-red-400 border border-white rounded p-4"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}