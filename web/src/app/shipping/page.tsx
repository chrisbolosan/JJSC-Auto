/* 
Citation: 
AI-Generated Code

Tool/Source:
Claude

Date:
11/11/2026

Prompt:
clean this code, eliminate statuses and getShipmentsByStatus import and the 
related calls from it and replace it with the useEffects code for I 
can display the data from the api call into a table

Code/Resource Usage:
had to refactor the page that had dummy data before and added data from the db.
*/
'use client';
import { useEffect, useState } from 'react';

export type ShipData = {
  id: number;
  status: string;
  shipped_at: string;
  name: string;
  city: string;
};

// value must match what is stored in orders.status (compared case-insensitively)
const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Pending', value: 'pending' },
  { label: 'Delivery', value: 'delivery' },
];

export default function ShippingPage() {
  const [ship, setShip] = useState<ShipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/client_shipping')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: ShipData[]) => setShip(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visible =
    filter === 'all'
      ? ship
      : ship.filter((s) => s.status?.toLowerCase() === filter);

  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Shipping</h1>

      <nav aria-label="Shipment status" className="mt-4 flex flex-wrap gap-2">
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

      {loading && <p className="mt-4">Loading shipments...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="mt-4 text-sm text-gray-600">{visible.length} shipments</p>

          {visible.length === 0 ? (
            <p className="mt-6">No shipments with this status.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 pr-4">Order</th>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Destination</th>
                    <th className="py-2 pr-4">Ship date</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((s) => (
                    <tr key={s.id} className="border-b border-gray-200">
                      <td className="py-2 pr-4">ORD-{s.id}</td>
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.city}</td>
                      <td className="py-2 pr-4">
                        {s.shipped_at ? new Date(s.shipped_at).toLocaleDateString() : 'Not shipped'}
                      </td>
                      <td className="py-2">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}