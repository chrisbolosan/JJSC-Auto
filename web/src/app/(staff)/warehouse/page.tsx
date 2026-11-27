/* 
Jorge Ruiz
Citation: 
AI-Generated Code

Tool/Source:
Claude

Date:
11/14/2026

Prompt:
reformat my page.jsx to page.tsx instead of showing dummy data use the api call '/api/warehouse' 

Code/Resource Usage:
added db connectivity to the page
*/
'use client';
import { useEffect, useMemo, useState } from 'react';

export type WarehouseData = {
  number: number;
  description: string;
  price: number;
  weight: number;
  quantity: number;
  category: string;
};

// Shows a status label: 0 = out of stock, 5 or less = low stock
function stockStatus(quantity: number): string {
  if (quantity === 0) return 'Out of stock';
  if (quantity <= 5) return 'Low stock';
  return 'In stock';
}

export default function WarehousePage() {
  const [items, setItems] = useState<WarehouseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/api/warehouse')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: WarehouseData[]) => setItems(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Build the filter buttons from the categories that actually exist in the data
  const categories = useMemo(
    () =>
      Array.from(new Set(items.map((i) => i.category).filter(Boolean))).sort(),
    [items],
  );

  const visible =
    category === 'all' ? items : items.filter((i) => i.category === category);

  return (
    <section>
      <div className="container page">
        <h1 className="text-lg font-bold bg-brand text-ink px-4 py-2">
          Warehouse Inventory
        </h1>

        <nav aria-label="Categories" className="mt-4 flex flex-wrap gap-2">
          {['all', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded border px-3 py-1 ${
                category === c ? 'bg-brand text-ink' : ''
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </nav>

        {loading && <p className="mt-4">Loading inventory...</p>}
        {error && <p className="mt-4 error-text">Error: {error}</p>}

        {!loading && !error && (
          <>
            <p className="mt-4 text-sm text-metal">{visible.length} items</p>

            {visible.length === 0 ? (
              <p className="mt-6">No items in this category.</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="border-b border-line">
                      <th>SKU</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((p) => (
                      <tr key={p.number} className="border-b border-line">
                        <td>{p.number}</td>
                        <td>{p.description}</td>
                        <td>{p.category}</td>
                        <td>{p.quantity}</td>
                        <td className="py-2">{stockStatus(p.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
