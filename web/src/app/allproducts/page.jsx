import { Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/server/services/catalog.service';

export const metadata = { title: 'All products' };

// Notes:
// Async lets us use await inside the function, so we can fetch data from the server before rendering the page
// Header is large text, bold, blue background, white text
// Nav is a list of categories, each category is a link to the same page with a category query
// className is the react version of class, used for styling with Tailwind CSS
// mt-4 is margin top 4, flex is display flex, flex-wrap is wrap items, gap-2 is gap between items
// Each link has a rounded border | px-3 is padding, left and right, space 3 | py-1 is padding, top and bottom, space 1
// c.id is the category id, using href we can pass the category id as a query parameter to the same page, so we can filter products by category
// products.length is the number of products in the selected category, if no category is selected, it shows all products
// p.id is the product id, used as a key for each ProductCard component, which is a list item that shows the product name, SKU, price and stock status
// suspense fallback is a loading message that shows while the product list is being fetched from the server, it can be replaced with a something more fancy as a loading screen
export default function ProductsPage({ searchParams }) {
  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">
        All products
      </h1>

      <Suspense fallback={<p className="mt-4">Loading products...</p>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

//read db
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
