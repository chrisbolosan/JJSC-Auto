import { Suspense } from "react";
import Link from "next/link";
import { carriers, getShippingMethodsByCarrier } from "@/lib/shippingMethods";

export const metadata = { title: "Admin shipping" };

// Same structure as the other pages: the heading shows right away, the methods table waits inside <Suspense> because it reads searchParams
export default function AdminShippingPage({ searchParams }) {
    return (
        <div>
            <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Admin shipping</h1>

            <Suspense fallback={<p className="mt-4">Loading shipping methods...</p>}>
                <ShippingMethodList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

// Reads ?carrier= from the address, then shows the carrier links and a table of shipping methods
async function ShippingMethodList({ searchParams }) {
    const { carrier } = await searchParams;
    const methods = getShippingMethodsByCarrier(carrier);

    return (
        <>
            <nav aria-label="Carriers" className="mt-4 flex flex-wrap gap-2">
                <Link href="/admin/shipping" className={`rounded border px-3 py-1 ${!carrier ? "bg-blue-500 text-white" : ""}`}>
                    All
                </Link>
                {carriers.map((c) => (
                    <Link
                        key={c.id}
                        href={`/admin/shipping?carrier=${c.id}`}
                        className={`rounded border px-3 py-1 ${carrier === c.id ? "bg-blue-500 text-white" : ""}`}
                    >
                        {c.label}
                    </Link>
                ))}
            </nav>

            <p className="mt-4 text-sm text-gray-600">{methods.length} shipping methods</p>

            {methods.length === 0 ? (
                <p className="mt-6">No shipping methods for this carrier.</p>
            ) : (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 pr-4">Carrier</th>
                                <th className="py-2 pr-4">Service</th>
                                <th className="py-2 pr-4">Price</th>
                                <th className="py-2 pr-4">Delivery time</th>
                                <th className="py-2 pr-4">Status</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {methods.map((m) => (
                                <tr key={m.id} className="border-b border-gray-200">
                                    <td className="py-2 pr-4">{carriers.find((c) => c.id === m.carrier)?.label}</td>
                                    <td className="py-2 pr-4">{m.service}</td>
                                    <td className="py-2 pr-4">${m.price.toFixed(2)}</td>
                                    <td className="py-2 pr-4">{m.deliveryTime}</td>
                                    <td className="py-2 pr-4">{m.active ? "Active" : "Turned off"}</td>
                                    <td className="py-2">
                                        {/* Open an edit form for this method and save changes later */}
                                        <button type="button" className="underline">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}