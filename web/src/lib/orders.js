// Placeholder orders. Replace with real data (API or database) later, values are AI generated, all filler data. 
export const orderStatuses = [
    { id: "pending", label: "Pending payment" },
    { id: "paid", label: "Paid" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
];

export const orders = [
    { id: "ORD-2001", customer: "Alex Rivera", date: "2026-10-26", itemCount: 3, total: 132.47, status: "delivered" },
    { id: "ORD-2002", customer: "Jordan Lee", date: "2026-10-29", itemCount: 1, total: 189.0, status: "shipped" },
    { id: "ORD-2003", customer: "Sam Patel", date: "2026-10-30", itemCount: 2, total: 63.48, status: "shipped" },
    { id: "ORD-2004", customer: "Taylor Kim", date: "2026-10-31", itemCount: 4, total: 98.96, status: "paid" },
    { id: "ORD-2005", customer: "Chris Morgan", date: "2026-11-01", itemCount: 1, total: 54.99, status: "pending" },
];

// Returns the orders with one status, or all orders when no status is given
export function getOrdersByStatus(statusId) {
    if (!statusId) return orders;
    return orders.filter((o) => o.status === statusId);
}