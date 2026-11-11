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

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivery' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

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

  const visible =
    filter === 'all'
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === filter);

  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Orders</h1>

      <nav aria-label="Order status" className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded border px-3 py-1 ${
              filter === f.value ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {loading && <p className="mt-4">Loading orders...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="mt-4 text-sm text-gray-600">{visible.length} orders</p>

          {visible.length === 0 ? (
            <p className="mt-6">No orders with this status.</p>
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