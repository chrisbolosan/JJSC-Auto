import { Suspense } from 'react';
import Link from 'next/link';
import { orderStatuses, getOrdersByStatus } from '@/lib/orders';
import ReturnButton from '@/components/returnButton';
export const metadata = { title: 'Orders' };
import { getOrderById } from '@/server/services/orderDetails.service';
//test
getOrderById(1);
// getOrderById('a');
// Same structure as the other pages: the heading shows right away, the orders table waits inside <Suspense> because it reads searchParams
export default function OrdersPage({ searchParams }) {
  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">
        Orders
      </h1>

      <Suspense fallback={<p className="mt-4">Loading orders...</p>}>
        <OrderList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Reads ?status= from the address, then shows the status links and a table of orders
async function OrderList({ searchParams }) {
  const { status } = await searchParams;
  const orders = getOrdersByStatus(status);

  return (
    <>
      <nav aria-label="Order status" className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded border px-3 py-1 ${!status ? 'bg-blue-500 text-white' : ''}`}
        >
          All
        </Link>
        {orderStatuses.map((s) => (
          <Link
            key={s.id}
            href={`/admin/orders?status=${s.id}`}
            className={`rounded border px-3 py-1 ${status === s.id ? 'bg-blue-500 text-white' : ''}`}
          >
            {s.label}
          </Link>
        ))}
      </nav>

      <p className="mt-4 text-sm text-gray-600">{orders.length} orders</p>

      {orders.length === 0 ? (
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
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-200">
                  <td className="py-2 pr-4">{o.id}</td>
                  <td className="py-2 pr-4">{o.customer}</td>
                  <td className="py-2 pr-4">{o.date}</td>
                  <td className="py-2 pr-4">{o.itemCount}</td>
                  <td className="py-2 pr-4">${o.total.toFixed(2)}</td>
                  <td className="py-2">
                    {orderStatuses.find((x) => x.id === o.status)?.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="m-4">
            <ReturnButton
              href="/admin"
              label="LET'S GO!"
              styles="bg-red-400 border border-white rounded p-4"
            ></ReturnButton>
          </div>
        </div>
      )}
    </>
  );
}
