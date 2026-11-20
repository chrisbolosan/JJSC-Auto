'use client';
import { useState } from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage';
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
  const cart = getFullCart();

  //let weightState = 0;

  const [partDat, setPartDat] = useState(null);
  const [shipDat, setShipDat] = useState(0);
  const [brackDat, setBrackDat] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //if (!mounted) {
    const fetchData = async () => {
      const result = await showGroupIndiv(cart);
      setPartDat(result);
      setMounted(true); //allows the rendering
    };
    fetchData();

    const fetchShip = async () => {
      const wresult = await getBrack(0);
      setShipDat(wresult);
      return wresult;
    };
    fetchShip();

    const fetchBrack = async () => {
      const bresult = await getCompareBrackets();
      setBrackDat(bresult);
    };
    fetchBrack();

    //setMounted(true); //allows the rendering
    //}
  }, [showGroupIndiv, getBrack, shipDat]);

  if (!mounted) return null; // Matches server render

  let total = 0;
  let weightT = 0;
  for (const p of partDat) {
    total += Number(p.price) * getItem(String(p.number));
    weightT += Number(p.weight) * getItem(String(p.number));
  }
  //weightState = weightT;

  let shipCharge = 0;
  for (const b of brackDat) {
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
      <ul className="divide-y divide-gray-200">
        {partDat.map((p, index) => (
          <div key={index} className="flex justify-between">
            <span
              title={p.description}
            >{`${p.description.slice(0, 25)}...`}</span>
            <span>{`x ${getItem(String(p.number))} `}</span>
            <span>
              ${`${(Number(p.price) * getItem(String(p.number))).toFixed(2)}`}
            </span>
          </div>
        ))}
      </ul>

      <div className="mt-4 border-t flex justify-between border-gray-300">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-gray-300">
        <span>Shipping:</span>
        <span>${shipCharge.toFixed(2)}</span>
      </div>

      <p className="mt-4 flex justify-between border-t border-gray-300 pt-2 font-semibold">
        <span>Total</span>
        <span>${(total + shipCharge).toFixed(2)}</span>
      </p>
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
  console.log('tiemz', item);
  return (
    <div key={item}>
      {item} x {getItem(String(item))}
    </div>
  );
}
