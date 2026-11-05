'use client';
import { Tables } from "@/server/types/database.types";
import { useState, useEffect } from 'react';

export default function Shipping() {
  type ship_data = {
  id: number;
  status: string;
  shipped_at: string;
  name: string;
  city: string;
  };


  const [ship, setShip] = useState<ship_data[]>([]);

  useEffect(() =>{
      fetch('/api/client_shipping')
        .then(response => response.json())
        .then(data => setShip(data));
  }, [ship]);
}

/* // Placeholder shipments. Replace with real data (API or database) later. Values are AI generated, all filler data
export const statuses = [
    { id: "pending", label: "Pending" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
];

export const shipments = [
    { id: "SH-1001", orderNumber: "ORD-2001", customer: "Alex Rivera", destination: "Dallas, TX", carrier: "UPS", tracking: "TRK-0001", status: "delivered", shipDate: "2026-10-27" },
    { id: "SH-1002", orderNumber: "ORD-2002", customer: "Jordan Lee", destination: "Austin, TX", carrier: "FedEx", tracking: "TRK-0002", status: "shipped", shipDate: "2026-10-30" },
    { id: "SH-1003", orderNumber: "ORD-2003", customer: "Sam Patel", destination: "Tulsa, OK", carrier: "USPS", tracking: "TRK-0003", status: "shipped", shipDate: "2026-10-31" },
    { id: "SH-1004", orderNumber: "ORD-2004", customer: "Taylor Kim", destination: "Houston, TX", carrier: "", tracking: "", status: "pending", shipDate: null },
];
 */
// Returns the shipments with one status, or all shipments when no status is given
/* export function getShipmentsByStatus(statusId) {
    if (!statusId) return shipments;
    return shipments.filter((s) => s.status === statusId);
} */