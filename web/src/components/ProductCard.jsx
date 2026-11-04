// One product tile: image placeholder, name, SKU, price and stock status
// Render it inside a <ul>, since it returns an <li>
import UpdateItem from "@/components/UpdateItem";

export default function ProductCard({ product }) {
    return (
        <li className="flex flex-col rounded border border-gray-300 p-3">
            <div className="flex aspect-square items-center justify-center bg-gray-100 text-sm text-gray-500">
                Image
            </div>
            <h3 className="mt-3 font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">SKU {product.sku}</p>
            <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-sm">{product.inStock ? "In stock" : "Out of stock"}</p>
            <div>
            <UpdateItem itemName={product.sku}/>
        
            </div>
        </li>
    );
}
//<button class="rounded bg-red-500 px-4 py-2 text-white">-</button>
//<button class="rounded bg-green-500 px-4 py-2 text-white">+</button>