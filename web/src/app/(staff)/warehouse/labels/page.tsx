'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ShowOrderReceipt from '@/components/ShowOrderReceipt';

// Packing & shipping workstation.
// Flow per order: print packing list -> pick items -> print invoice ->
// print shipping label -> complete (status = shipped, customer emailed).

type QueueOrder = {
  id: number;
  status: string;
  created_at: string;
  shipped_at: string | null;
  total_weight: number;
  customer_name: string;
  city: string;
  item_count: number;
};

type OrderItem = {
  part_number: number;
  description: string;
  weight: number;
  quantity: number;
  price: number;
  line_total: number;
  pictureURL?: string;
};

type OrderDetails = {
  id: number;
  status: string;
  created_at: string;
  shipped_at: string | null;
  total_weight: number;
  subtotal: number;
  shipping: number;
  total: number;
  auth_number: string;
  customer: {
    name: string;
    email: string;
    street: string;
    city: string;
    zip_code: string;
  };
  items: OrderItem[];
};

type PrintDoc = 'packing' | 'invoice' | 'label';

type ShipResult = {
  id: number;
  emailed: boolean;
  emailedTo?: string;
  emailError?: string;
  inventoryError?: string | null;
};

// Return address printed on shipping labels
const SHIP_FROM = ['JJSC Auto', 'Auto Parts'];

const fmtDate = (d: string | null) =>
  d
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(d))
    : '';

export default function WarehouseLabelsPage() {
  const [view, setView] = useState<'authorized' | 'shipped'>('authorized');
  const [orders, setOrders] = useState<QueueOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notice, setNotice] = useState<ShipResult | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    fetch(`/api/warehouse/orders${view === 'shipped' ? '?status=shipped' : ''}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: QueueOrder[]) => {
        setOrders(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [view, reloadKey]);

  function loadOrders() {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  function handleShipped(result: ShipResult) {
    setNotice(result);
    setSelectedId(null);
    setOrders((prev) => prev.filter((o) => o.id !== result.id));
  }

  return (
    <section>
      <div className="page">
        {/* When printing, hide everything on the page except #print-area,
          which is rendered directly under <body> */}
        <style>{`
        @media print {
          body > *:not(#print-area) { display: none !important; }
        }
      `}</style>

        <div className="print:hidden">
          <h1 className="text-lg font-bold bg-brand text-ink px-4 py-2">
            Packing &amp; Shipping Station
          </h1>

          {notice && (
            <div
              role="status"
              className={`mx-4 mt-4 rounded border px-4 py-3 text-sm ${
                notice.emailed && !notice.inventoryError
                  ? 'border-ok bg-ok/10 text-ok'
                  : 'border-warning bg-warning/10 error-text'
              }`}
            >
              <strong>Order #{notice.id} shipped.</strong>{' '}
              {notice.emailed
                ? `Shipping confirmation emailed to ${notice.emailedTo}.`
                : `The order is marked shipped, but the email failed: ${notice.emailError}`}
              {notice.inventoryError &&
                ` Inventory was not updated: ${notice.inventoryError}`}
              <button
                type="button"
                onClick={() => setNotice(null)}
                className="ml-3 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid gap-4 p-4 lg:grid-cols-[20rem_1fr]">
            {/* Order queue */}
            <aside className="rounded border border-line">
              <div className="flex border-b border-line">
                {(
                  [
                    ['authorized', 'To pack'],
                    ['shipped', 'Recently shipped'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      if (value === view) return;
                      setLoading(true);
                      setView(value);
                      setSelectedId(null);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-semibold ${
                      view === value ? 'bg-brand text-ink' : ''
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between px-3 py-2 text-sm text-metal">
                <span>{loading ? 'Loading…' : `${orders.length} orders`}</span>
                <button
                  type="button"
                  onClick={loadOrders}
                  className="underline"
                >
                  Refresh
                </button>
              </div>

              {error && <p className="px-3 pb-3 error-text">Error: {error}</p>}

              {!loading && !error && orders.length === 0 && (
                <p className="px-3 pb-3 text-sm">
                  {view === 'authorized'
                    ? 'No orders waiting to be packed.'
                    : 'No shipped orders yet.'}
                </p>
              )}

              <ul className="max-h-[70vh] overflow-y-auto">
                {orders.map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(o.id)}
                      className={`w-full border-t border-line px-3 py-2 text-left text-sm hover:bg-surface ${
                        selectedId === o.id ? 'bg-blue-50 font-semibold' : ''
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>Order #{o.id}</span>
                        <span className="text-metal">
                          {fmtDate(
                            view === 'shipped' ? o.shipped_at : o.created_at,
                          )}
                        </span>
                      </div>
                      <div className="text-metal">
                        {o.customer_name} · {o.city} · {o.item_count} item
                        {o.item_count === 1 ? '' : 's'} · {o.total_weight} lbs
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Workflow for the selected order */}
            <section>
              {selectedId === null ? (
                <p className="rounded border border-dashed border-line p-6 text-center text-metal">
                  Select an order from the list to start packing.
                </p>
              ) : (
                <PackingStation
                  key={selectedId}
                  orderId={selectedId}
                  onShipped={handleShipped}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackingStation({
  orderId,
  onShipped,
}: {
  orderId: number;
  onShipped: (r: ShipResult) => void;
}) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [printing, setPrinting] = useState<PrintDoc | null>(null);
  const [shipping, setShipping] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok)
          throw new Error(body.error ?? `Request failed: ${res.status}`);
        return body as OrderDetails;
      })
      .then(setOrder)
      .catch((err: Error) => setError(err.message));
  }, [orderId]);

  // Render the chosen document into #print-area, then open the print dialog.
  // The document is cleared once the dialog closes.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(null);
    window.addEventListener('afterprint', done);
    const t = setTimeout(() => window.print(), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener('afterprint', done);
    };
  }, [printing]);

  if (error) return <p className="error-text">Error: {error}</p>;
  if (!order) return <p>Loading order #{orderId}…</p>;

  const alreadyShipped = order.status === 'shipped';

  async function completeOrder() {
    setShipping(true);
    setError(null);
    try {
      const res = await fetch(`/api/warehouse/orders/${orderId}/ship`, {
        method: 'POST',
      });
      const body = await res.json();
      if (!res.ok)
        throw new Error(body.error ?? `Request failed: ${res.status}`);
      onShipped(body as ShipResult);
    } catch (err) {
      setError((err as Error).message);
      setShipping(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold">Order #{order.id}</h2>
        <span className="text-sm text-metal">
          {order.customer.name} · {order.total_weight} lbs ·{' '}
          {alreadyShipped
            ? `Shipped ${fmtDate(order.shipped_at)}`
            : 'Awaiting shipment'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <PrintButton doc="packing" onPrint={setPrinting}>
          Print packing list
        </PrintButton>
        <PrintButton doc="invoice" onPrint={setPrinting}>
          Print invoice
        </PrintButton>
        <PrintButton doc="label" onPrint={setPrinting}>
          Print shipping label
        </PrintButton>
        {!alreadyShipped && (
          <button
            type="button"
            className="btn-primary"
            disabled={shipping}
            onClick={completeOrder}
          >
            {shipping ? 'Shipping…' : 'Complete & ship order'}
          </button>
        )}
      </div>
      {!alreadyShipped && (
        <p className="text-sm text-metal">
          Completing marks the order as shipped, takes the items out of
          inventory and emails a shipping confirmation to {order.customer.email}
          .
        </p>
      )}

      <ul className="divide-y divide-line rounded border border-line">
        {order.items.map((i) => (
          <li key={i.part_number} className="flex items-center gap-3 px-3 py-2">
            <span className="w-10 text-lg font-bold">{i.quantity}×</span>
            <span className="flex-1">
              {i.description}
              <span className="block text-xs text-metal">
                Part #{i.part_number} · {i.weight} lbs each
              </span>
            </span>
          </li>
        ))}
      </ul>

      <details className="rounded border border-line p-3">
        <summary className="cursor-pointer font-semibold">
          Order details
        </summary>
        <ShowOrderReceipt orderId={order.id} />
      </details>

      {/* Printable documents (hidden on screen). The invoice stays mounted so
          ShowOrderReceipt has already loaded its data when Print is pressed. */}
      {createPortal(
        <div id="print-area" className="hidden print:block">
          {printing === 'packing' && <PackingList order={order} />}
          <div className={printing === 'invoice' ? '' : 'hidden'}>
            <div className="mb-2 text-sm">
              JJSC Auto · Payment auth #{order.auth_number}
            </div>
            <ShowOrderReceipt orderId={order.id} title="Invoice" />
          </div>
          {printing === 'label' && <ShippingLabel order={order} />}
        </div>,
        document.body,
      )}
    </div>
  );
}

function PrintButton({
  doc,
  onPrint,
  children,
}: {
  doc: PrintDoc;
  onPrint: (d: PrintDoc) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="btn-secondary"
      onClick={() => onPrint(doc)}
    >
      {children}
    </button>
  );
}

function PackingList({ order }: { order: OrderDetails }) {
  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <div className="p-6 text-ink">
      <h1 className="text-2xl font-bold">Packing List</h1>
      <p>
        Order #{order.id} · Placed {fmtDate(order.created_at)}
      </p>
      <div className="mt-4">
        <div className="font-semibold">Ship to</div>
        <div>{order.customer.name}</div>
        <div>{order.customer.street}</div>
        <div>
          {order.customer.city}, {order.customer.zip_code}
        </div>
      </div>
      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-2 pr-2">Picked</th>
            <th className="py-2 pr-2">Qty</th>
            <th className="py-2 pr-2">Part #</th>
            <th className="py-2 pr-2">Description</th>
            <th className="py-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((i) => (
            <tr key={i.part_number} className="border-b border-gray-400">
              <td className="py-2 pr-2">☐</td>
              <td className="py-2 pr-2 font-bold">{i.quantity}</td>
              <td className="py-2 pr-2">{i.part_number}</td>
              <td className="py-2 pr-2">{i.description}</td>
              <td className="py-2">{(i.weight * i.quantity).toFixed(2)} lbs</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4">
        {totalQty} items · Total weight {order.total_weight} lbs
      </p>
    </div>
  );
}

function ShippingLabel({ order }: { order: OrderDetails }) {
  return (
    <div className="m-6 w-[4in] border-2 border-black p-4 text-ink">
      <div className="text-xs">
        FROM:
        {SHIP_FROM.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div className="my-4 border-y-2 border-black py-4">
        <div className="text-xs">SHIP TO:</div>
        <div className="text-xl font-bold uppercase">{order.customer.name}</div>
        <div className="text-lg uppercase">{order.customer.street}</div>
        <div className="text-lg uppercase">
          {order.customer.city} {order.customer.zip_code}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span>
          ORDER <strong className="text-2xl">#{order.id}</strong>
        </span>
        <span>
          WT <strong>{order.total_weight} LBS</strong>
        </span>
      </div>
      <div className="mt-1 text-xs">
        Shipped {fmtDate(new Date().toISOString())}
      </div>
    </div>
  );
}
