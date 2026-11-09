/*
"use client";

import { useCart } from "./CartProvider";

// Adds one unit of the product to the quote cart. Disabled when the product is out of stock
export default function AddToCartButton({ product }) {
    
    const { add } = useCart();
    return (
        <button
            type="button"
            disabled={!product.inStock}
            onClick={() => add(product)}
            className="rounded bg-blue-500 px-3 py-1 text-white disabled:opacity-40"
        >
            {product.inStock ? "Add to quote" : "Out of stock"}
        </button>
    );
}
    */