"use client";
//For use state & use effects

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart";

// Computes the next cart from the current cart and an action
// Each cart item keeps a snapshot of the product (id, sku, name, price) plus qty
// - so the cart still works if products later come from an API
function reducer(state, action) {
    switch (action.type) {
        case "load":
            return action.items;
        case "add": {
            const { id, sku, name, price } = action.product;
            if (state.some((i) => i.id === id)) {
                return state.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
            }
            return [...state, { id, sku, name, price, qty: 1 }];
        }
        case "setQty":
            if (action.qty < 1) return state.filter((i) => i.id !== action.id);
            return state.map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i));
        case "remove":
            return state.filter((i) => i.id !== action.id);
        case "clear":
            return [];
        default:
            return state;
    }
}

// Wrap the app in this so every page shares one cart
export function CartProvider({ children }) {
    const [items, dispatch] = useReducer(reducer, []);
    // False until the saved cart has been read from the browser
    const [ready, setReady] = useState(false);

    // Runs once in the browser: restore a saved cart
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            if (Array.isArray(saved)) dispatch({ type: "load", items: saved });
        } catch {}
        setReady(true);
    }, []);

    // Save on every change, but only after loading, so an empty first render can't wipe a saved cart
    useEffect(() => {
        if (!ready) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {}
    }, [items, ready]);

    const value = useMemo(
        () => ({
            items,
            ready,
            count: items.reduce((n, i) => n + i.qty, 0),
            add: (product) => dispatch({ type: "add", product }),
            setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
            remove: (id) => dispatch({ type: "remove", id }),
            clear: () => dispatch({ type: "clear" }),
        }),
        [items, ready]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Gives a component the cart: ( items, ready, count, add, setQty, remove, clear )
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}