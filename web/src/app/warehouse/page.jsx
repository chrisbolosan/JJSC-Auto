import { Suspense } from "react";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/products";

export const metadata = { title: "Warehouse" };

// Same structure as the products page
// the inventory table waits inside <Suspense> because it reads searchParams
export default function WarehousePage({ searchParams }) {
    return (
        <div>
            <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">Warehouse</h1>

            <Suspense fallback={<p className="mt-4">Loading inventory...</p>}>
                <InventoryTable searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

// Shows a status label: 0 = out of stock, 5 or less = low stock
function stockStatus(quantity) {
    if (quantity === 0) return "Out of stock";
    if (quantity <= 5) return "Low stock";
    return "In stock";
}

// Reads ?category= from the address, then shows the category links and a table of items
async function InventoryTable({ searchParams }) {
    const { category } = await searchParams;
    const products = getProductsByCategory(category);

    return (
        <>
            <nav aria-label="Categories" className="mt-4 flex flex-wrap gap-2">
                <Link href="/warehouse" className={`rounded border px-3 py-1 ${!category ? "bg-blue-500 text-white" : ""}`}>
                    All
                </Link>
                {categories.map((c) => (
                    <Link
                        key={c.id}
                        href={`/warehouse?category=${c.id}`}
                        className={`rounded border px-3 py-1 ${category === c.id ? "bg-blue-500 text-white" : ""}`}
                    >
                        {c.label}
                    </Link>
                ))}
            </nav>

            <p className="mt-4 text-sm text-gray-600">{products.length} items</p>

            <table className="mt-4 w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="py-2 pr-4">SKU</th>
                        <th className="py-2 pr-4">Name</th>
                        <th className="py-2 pr-4">Category</th>
                        <th className="py-2 pr-4">Location</th>
                        <th className="py-2 pr-4">Quantity</th>
                        <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b border-gray-200">
                            <td className="py-2 pr-4">{p.sku}</td>
                            <td className="py-2 pr-4">{p.name}</td>
                            <td className="py-2 pr-4">{categories.find((c) => c.id === p.category)?.label}</td>
                            <td className="py-2 pr-4">{p.location}</td>
                            <td className="py-2 pr-4">{p.quantity}</td>
                            <td className="py-2">{stockStatus(p.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}