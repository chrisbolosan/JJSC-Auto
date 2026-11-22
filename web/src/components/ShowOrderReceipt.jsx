'use client';
//import {useState} from 'react';
import { getItem, setItem, getFullCart } from '@/app/api/utils/localStorage';
//import { useEffect } from 'react';
import { showIndiv } from './customersServer';
import { useCallback, useEffect, useState } from 'react';
//import { indivPart } from '@/server/services/order.service';
import { getOrderDetails } from '@/components/showOrdersReceiptsServer';

// orderId: optional, defaults to the ORDER_ID saved at checkout
// title: heading shown above the order (e.g. "Invoice" in the warehouse)
export default function ShowOrderReceipt({ orderId: orderIdProp, title = 'Order Details' }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const orderId = orderIdProp ?? getItem('ORDER_ID');
    let ignore = false;
    const fetchData = async () => {
      const result = await getOrderDetails(orderId);
      if (ignore) return;
      setOrderDetails(result);
      setMounted(true);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [orderIdProp]);

  if (!mounted) return null; // Matches server render
  if (!orderDetails) return <p className="pt-2">Order not found.</p>;

  const itemdat = orderDetails.order_items;
  const cust = orderDetails.customer;
  const items = orderDetails.items;
  const subtotal = orderDetails.subtotal;
  const orderDat = new Date(orderDetails.created_at);
  const orderDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(orderDat);
 //format date later
  return (
    <div>
      <h1 className="pt-2 font-semibold">{title}</h1>
      <h2>Order placed {orderDate} | Order # {orderDetails.id}</h2>
      <div className="mt-4 border-t justify-between border-gray-300" >

        <div className="border rounded flex justify-evenly">
        <div className="flex justify-between">
          <ul className=" divide-gray-200">
          <li><span>Ship to </span></li>
          <li><span>{cust.name} </span></li>
          <li><span>{cust.email}</span></li>
          <li><span>{cust.street}</span></li>
          <li><span>{cust.city}, {cust.zip_code}</span></li>
          </ul>
        </div>

        <div className="flex justify-between">
          <ul className="divide-gray-200"> 
          <li><span>Orders Summary</span></li>
          <li><span>Item(s) Subtotal: ${orderDetails.subtotal}</span></li>
          <li><span>Shipping & Handling: ${orderDetails.shipping}</span></li>
          <li><span>Total: ${orderDetails.total}</span></li>
          </ul>
        </div>
      </div>
      </div>
      <div className="border flex flex-col  items-center rounded">
        {items.map((i, index) => (
          <div key={index} className="flex pt-3">
            <img src={i.pictureURL} width="100"></img>
            <ul className="divide-gray-200">
            <li><span>{i.description}</span></li>
            <li><span>Qty: {i.quantity}</span></li>
            <li><span>${(i.price * i.quantity).toFixed(2)}</span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 
//{`${i.description} x ${i.quantity} = $${(i.price * i.quantity).toFixed(2)}`}