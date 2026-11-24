import { Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/server/services/catalog.service';

export const metadata = { title: 'All products' };

export default function ProductsPage({ searchParams }) {
  return (
    <main>
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Shop parts
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              All products
            </h1>
          </div>

          <Suspense fallback={<p className="mt-4">Loading products...</p>}>
            <ProductList searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

async function ProductList({ searchParams }) {
  const { category } = await searchParams;
  const allProducts = await getAllProducts();

  const categories = [];
  for (const p of allProducts) {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  }
  categories.sort();
  const products = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <>
      <nav className="mt-4 flex flex-wrap gap-2 px-4">
        <Link
          href="/allproducts"
          className={`rounded border px-3 py-1 ${!category ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/allproducts?category=${encodeURIComponent(c)}`}
            className={`rounded border px-3 py-1 ${category === c ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
          >
            {c}
          </Link>
        ))}
      </nav>
      <p className="mt-4 text-sm text-gray-600">{products.length} products</p>

      {products.length === 0 ? (
        <p className="mt-6">No products found.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.number} product={p} />
          ))}
        </ul>
      )}
    </>
  );
}
