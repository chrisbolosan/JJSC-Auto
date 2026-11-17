'use client';
//import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage';
//import { useEffect } from 'react';
import { showIndiv } from './customersServer';
import { useCallback, useEffect, useState } from 'react';
//import { indivPart } from '@/server/services/order.service';
import { getOrderDetails } from '@/components/showOrdersReceiptsServer';

export default function ShowItems() {
  const orderId = getItem('ORDER_ID');

  const [orderDetails, setOrderDetails] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOrderDetails(orderId);
      setOrderDetails(result);
    };
    fetchData();
     setMounted(true);
  }, [getOrderDetails]);

  if (!mounted) return null; // Matches server render

  const itemdat = orderDetails.order_items;
  const cust = orderDetails.customer;
  const items = orderDetails.items;
  const subtotal = orderDetails.subtotal;

  return (
    <div>
      {orderDetails.id} {} {orderDetails.total} {'lol'} {cust.name}{' '}
      {` ${cust.email}`}
      {items.map((i, index) => (
        <div key={index}>{`${i.description} x ${i.quantity} = $${i.price}`}</div>
      ))}
    </div>
  );
}


//KEEP NOTE, MAY HAVEN TO CHANGE DATABASE ORDERITEM PRICE SINCE I HAVE IT SET AS QTY * PRICE
/*
export function ordDet(ordID) {
  getOrderDetails(Number(ordID));
}
  */
// //temp hide
// export async function itemName(id){
//     //const orderDetails = await getOrderDetails(Number(id))

//     const[orderDetails, setOrderDetails] = useState(null);

//     useEffect(() => {
//         const fetchData = async () =>{
//             const result = await getOrderDetails(id);
//             setOrderDetails(result);
//         };
//         fetchData();
//     }, [ getOrderDetails ])

//     return (
//         <div>
//             LOLOLOL
//             {orderDetails}
//         </div>//{orderDetails.id} x {orderDetails.total}

//     )

// }
