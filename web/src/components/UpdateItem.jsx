'use client';
import { useState, useSyncExternalStore } from 'react';

// Cart quantities live in localStorage, keyed by part number.
export function useLocalStorageNumber(key, def = 0) {
  const sub = (callback) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  };

  const getSnapshot = () => {
    const val = localStorage.getItem(key);
    return val !== null ? Number(val) : def;
  };

  const getServerSnap = () => def;
  const val = useSyncExternalStore(sub, getSnapshot, getServerSnap);
  const setVal = (newVal) => {
    localStorage.setItem(key, newVal);
    window.dispatchEvent(new StorageEvent('storage', { key }));
  };

  return [val, setVal];
}

export default function UpdateItem({ itemName, itemStock }) {
  const [inCart, setInCart] = useLocalStorageNumber(itemName, 0);
  const [asking, setAsking] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(null);

  const stock = Number(itemStock) || 0;
  const available = Math.max(stock - inCart, 0);

  if (stock <= 0) {
    return <p className="text-sm font-semibold text-warning">Not available</p>;
  }

  function openPrompt() {
    setQty(1);
    setAdded(null);
    setAsking(true);
  }

  function confirmAdd(e) {
    e.preventDefault();
    const amount = Math.min(Math.max(Math.floor(qty) || 0, 1), available);
    setInCart(inCart + amount);
    setAdded(amount);
    setAsking(false);
  }

  if (asking) {
    return (
      <form onSubmit={confirmAdd} className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor={`qty-${itemName}`}>
          Quantity
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="btn-secondary px-3"
            onClick={() => setQty((q) => Math.max(q - 1, 1))}
          >
            −
          </button>
          <input
            id={`qty-${itemName}`}
            type="number"
            min={1}
            max={available}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-16 rounded border border-line px-2 py-2 text-center"
            autoFocus
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="btn-secondary px-3"
            onClick={() => setQty((q) => Math.min(q + 1, available))}
          >
            +
          </button>
        </div>
        <p className="text-xs text-metal">Up to {available} more</p>
        <div className="flex gap-2">
          <button type="submit" className="btn-primary flex-1">
            Add
          </button>
          <button
            type="button"
            className="btn-secondary flex-1"
            onClick={() => setAsking(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        className="btn-primary w-full"
        onClick={openPrompt}
        disabled={available === 0}
      >
        {available === 0 ? 'Max in cart' : 'Add to cart'}
      </button>
      {inCart > 0 && (
        <p className="text-xs text-metal" role="status">
          {added ? `Added ${added}. ` : ''}
          {inCart} in cart
        </p>
      )}
    </div>
  );
}
