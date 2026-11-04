import { Suspense } from "react";
import Link from "next/link";
import { statuses, getShipmentsByStatus } from "@/lib/shipments";

export const metadata = { title: "Shipping" };
import { useEffect } from 'react';

// Same structure as the other pages: the heading shows right away, the shipments table waits inside <Suspense> because it reads searchParams
export default function ShippingPage({ searchParams }) {
    return (
        <div>
            <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Shipping</h1>

            <Suspense fallback={<p className="mt-4">Loading shipments...</p>}>
                <ShipmentList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

// Reads ?status= from the address, then shows the status links and a table of shipments
async function ShipmentList({ searchParams }) {
    const { status } = await searchParams;
    const shipments = getShipmentsByStatus(status);

    return (
        <>
            <nav aria-label="Shipment status" className="mt-4 flex flex-wrap gap-2">
                <Link href="/shipping" className={`rounded border px-3 py-1 ${!status ? "bg-blue-500 text-white" : ""}`}>
                    All
                </Link>
                {statuses.map((s) => (
                    <Link
                        key={s.id}
                        href={`/shipping?status=${s.id}`}
                        className={`rounded border px-3 py-1 ${status === s.id ? "bg-blue-500 text-white" : ""}`}
                    >
                        {s.label}
                    </Link>
                ))}
            </nav>

            <p className="mt-4 text-sm text-gray-600">{shipments.length} shipments</p>

            {shipments.length === 0 ? (
                <p className="mt-6">No shipments with this status.</p>
            ) : (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 pr-4">Order</th>
                                <th className="py-2 pr-4">Customer</th>
                                <th className="py-2 pr-4">Destination</th>
                                <th className="py-2 pr-4">Carrier</th>
                                <th className="py-2 pr-4">Tracking</th>
                                <th className="py-2 pr-4">Ship date</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((s) => (
                                <tr key={s.id} className="border-b border-gray-200">
                                    <td className="py-2 pr-4">{s.orderNumber}</td>
                                    <td className="py-2 pr-4">{s.customer}</td>
                                    <td className="py-2 pr-4">{s.destination}</td>
                                    <td className="py-2 pr-4">{s.carrier || "Not assigned"}</td>
                                    <td className="py-2 pr-4">{s.tracking || "None yet"}</td>
                                    <td className="py-2 pr-4">{s.shipDate ?? "Not shipped"}</td>
                                    <td className="py-2">{statuses.find((x) => x.id === s.status)?.label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}