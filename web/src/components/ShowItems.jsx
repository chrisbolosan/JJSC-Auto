'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  getItem,
  getFullCart,
  removeFromCart,
  emptyCart,
} from '@/app/api/utils/localStorage';
import { useEffect } from 'react';
import {
  showIndiv,
  showGroupIndiv,
  saveWeight,
  getBrack,
  getCompareBrackets,
} from './customersServer';
import { useCallback } from 'react';
//import { indivPart } from '@/server/services/order.service';

export default function ShowItems() {
  const [partDat, setPartDat] = useState(null);
  const [brackDat, setBrackDat] = useState([]);
  const [confirmEmpty, setConfirmEmpty] = useState(false);

  useEffect(() => {
    const cart = getFullCart();

    const fetchData = async () => {
      const result = await showGroupIndiv(cart);
      setPartDat(result);
    };
    fetchData();

    const fetchBrack = async () => {
      const bresult = await getCompareBrackets();
      setBrackDat(bresult);
    };
    fetchBrack();
  }, []);

  if (!partDat) return null; // nothing until cart data loads (matches server render)

  if (partDat.length === 0) {
    return (
      <div>
        <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
        <p className="text-sm text-metal">Your cart is empty.</p>
        <Link href="/allproducts" className="btn-primary mt-4 w-full">
          Shop parts
        </Link>
      </div>
    );
  }

  function removeLine(part) {
    removeFromCart(part);
    setPartDat((prev) => prev.filter((x) => x.number !== part));
  }

  function clearAll() {
    emptyCart();
    setPartDat([]);
    setConfirmEmpty(false);
  }

  let total = 0;
  let weightT = 0;
  let defaultQuantity = 0;
  for (const p of partDat) {
    const quantity = Number(getItem(String(p.number))) || 0;

    total += Number(p.price) * quantity;
    weightT += Number(p.weight) * quantity;
    defaultQuantity += quantity;
  }
  //weightState = weightT;

  let shipCharge = 0;
  for (const b of defaultQuantity > 0 ? brackDat : []) {
    if (
      b.min_weight <= weightT &&
      (b.max_weight == null || weightT < b.max_weight)
    ) {
      shipCharge = b.shipping_charge;
    }
  }

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
      <ul className="divide-y divide-line">
        {partDat.map((p) => (
          <li
            key={p.number}
            className="flex items-center justify-between gap-2 py-1"
          >
            <span
              title={p.description}
            >{`${p.description.slice(0, 25)}...`}</span>
            <span>{`x ${getItem(String(p.number))} `}</span>
            <span>
              ${`${(Number(p.price) * getItem(String(p.number))).toFixed(2)}`}
            </span>
            <button
              type="button"
              onClick={() => removeLine(p.number)}
              className="text-xs error-text underline hover:no-underline"
              aria-label={`Remove ${p.description} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t flex justify-between border-line">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-line">
        <span>Shipping:</span>
        <span>${shipCharge.toFixed(2)}</span>
      </div>

      <p className="mt-4 flex justify-between border-t border-line pt-2 font-semibold">
        <span>Total</span>
        <span>${(total + shipCharge).toFixed(2)}</span>
      </p>

      <div className="mt-4">
        {confirmEmpty ? (
          <div role="alertdialog" aria-label="Empty cart" className="space-y-2">
            <p className="text-sm font-semibold">Empty your cart?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearAll}
                className="btn-primary flex-1"
              >
                Yes, empty
              </button>
              <button
                type="button"
                onClick={() => setConfirmEmpty(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmEmpty(true)}
            className="btn-secondary w-full"
          >
            Empty cart
          </button>
        )}
      </div>
    </div>
  );
}
/*
{`${p.description} x ${getItem(String(p.number))}   $${(Number(p.price) * getItem(String(p.number))).toFixed(2)}`}
<div>Total: {`$${Number(total) + Number(shipCharge)}`}</div>
                        
                        {items.map((p) => (
                            <li key={p.id} className="flex justify-between py-2 text-sm">
                                <span>{p.name} x 1</span>
                                <span>${p.price.toFixed(2)}</span>
                            </li>
                        ))
                        }
 */
export async function itemName({ item }) {
  return (
    <div key={item}>
      {item} x {getItem(String(item))}
    </div>
  );
}
