import { NextResponse } from 'next/server';
import { getOrderById } from '@/server/services/orderDetails.service';

// Next.js 15+: params is a Promise. On Next 14, use { params }: { params: { id: string } } and drop the await.
type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
      return NextResponse.json({ error: 'Invalid order id' }, { status: 400 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error('admin_showOrders/[id] failed:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}