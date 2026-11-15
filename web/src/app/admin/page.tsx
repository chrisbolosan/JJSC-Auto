/* 
Jorge Ruiz
Citation: 
AI-Generated Code

Tool/Source:
Claude

Date:
11/15/2026

Prompt:
on my admin order, i want to be able to select a specific order and after I click on one order,
it appears a new section in the same page showing all the details from the order

Code/Resource Usage:
to display orders from a admin point of view so it retrieves the data from the db via api call,
with a search panel and a details section for the selected order

*/
'use client';
import { useEffect, useRef, useState } from 'react';
import ReturnButton from '@/components/returnButton';

export type OrderData = {
  id: number;
  status: string;
  created_at: string;
  customer_name: string;
  item_count: number;
  total: number;
};

export type OrderDetails = {
  id: number;
  status: string;
  created_at: string;
  shipped_at: string | null;
  total_weight: number | null;
  subtotal: number | null;
  shipping: number | null;
  total: number | null;
  auth_number: string | null;
  customer: {
    name: string;
    email: string;
    street: string;
    city: string;
    zip_code: string;
  } | null;
  items: {
    part_number: number;
    description: string;
    weight: number;
    quantity: number;
    price: number;
    line_total: number;
  }[];
};

const STATUSES = [
  { label: 'Pending', value: 'authorized' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivery' },
];

const money = (n: number | null | undefined) => `$${Number(n ?? 0).toFixed(2)}`;

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

  // selected order state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<OrderDetails | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

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

  // Load the full details whenever a different order is selected
  useEffect(() => {
    if (selectedId === null) {
      setDetails(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    setDetails(null);

    fetch(`/api/admin_showOrder/${selectedId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: OrderDetails) => {
        if (!cancelled) setDetails(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setDetailError(err.message);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    // ignore a slow response if another order was clicked meanwhile
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  // Scroll the details section into view once it appears
  useEffect(() => {
    if (selectedId !== null) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedId, details]);

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
            {visible.length} of {orders.length} orders · click a row to see its details
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
                    <tr
                      key={o.id}
                      tabIndex={0}
                      onClick={() => setSelectedId(o.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(o.id);
                        }
                      }}
                      className={`cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
                        selectedId === o.id ? 'bg-blue-50' : ''
                      }`}
                    >
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

          {/* Order details */}
          {selectedId !== null && (
            <div ref={detailRef} className="mt-6 rounded border border-gray-300 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Order ORD-{selectedId} details</h2>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Close
                </button>
              </div>

              {detailLoading && <p className="mt-3">Loading details...</p>}
              {detailError && <p className="mt-3 text-red-600">Error: {detailError}</p>}

              {details && !detailLoading && !detailError && (
                <div className="mt-3 space-y-6">
                  <section>
                    <h3 className="mb-2 font-semibold">Order</h3>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <dt className="text-gray-500">Status</dt>
                        <dd>{details.status}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Created</dt>
                        <dd>{new Date(details.created_at).toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Shipped</dt>
                        <dd>
                          {details.shipped_at
                            ? new Date(details.shipped_at).toLocaleString()
                            : 'Not shipped'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Authorization #</dt>
                        <dd>{details.auth_number ?? '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Total weight</dt>
                        <dd>{details.total_weight ?? 0}</dd>
                      </div>
                    </dl>
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">Customer</h3>
                    {details.customer ? (
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <dt className="text-gray-500">Name</dt>
                          <dd>{details.customer.name}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Email</dt>
                          <dd>{details.customer.email}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Street</dt>
                          <dd>{details.customer.street}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">City</dt>
                          <dd>{details.customer.city}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Zip code</dt>
                          <dd>{details.customer.zip_code}</dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="text-sm">No customer linked to this order.</p>
                    )}
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">Items</h3>
                    {details.items.length === 0 ? (
                      <p className="text-sm">This order has no items.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-gray-300">
                              <th className="py-2 pr-4">Part #</th>
                              <th className="py-2 pr-4">Description</th>
                              <th className="py-2 pr-4">Weight</th>
                              <th className="py-2 pr-4">Qty</th>
                              <th className="py-2 pr-4">Price</th>
                              <th className="py-2">Line total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {details.items.map((item, idx) => (
                              <tr key={`${item.part_number}-${idx}`} className="border-b border-gray-200">
                                <td className="py-2 pr-4">{item.part_number}</td>
                                <td className="py-2 pr-4">{item.description}</td>
                                <td className="py-2 pr-4">{item.weight}</td>
                                <td className="py-2 pr-4">{item.quantity}</td>
                                <td className="py-2 pr-4">{money(item.price)}</td>
                                <td className="py-2">{money(item.line_total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <dl className="mt-3 ml-auto w-full max-w-xs text-sm">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>{money(details.subtotal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd>{money(details.shipping)}</dd>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <dt>Total</dt>
                        <dd>{money(details.total)}</dd>
                      </div>
                    </dl>
                  </section>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}