import { markOrderShipped } from '@/server/services/warehouse.service';
import { sendShipmentNotice } from '@/server/services/email.service';

// POST /api/warehouse/orders/:id/ship
// Completes the order (status -> shipped, shipped_at -> now), then emails the customer.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return Response.json(
      { error: 'order id must be a number' },
      { status: 400 },
    );
  }

  let shipped;
  try {
    shipped = await markOrderShipped(orderId);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }

  if (!shipped) {
    return Response.json(
      { error: `order ${orderId} not found or already shipped` },
      { status: 409 },
    );
  }

  // The order is shipped either way; a failed email is reported, not rolled back.
  try {
    const emailedTo = await sendShipmentNotice(orderId);
    return Response.json({ ...shipped, emailed: true, emailedTo });
  } catch (error) {
    return Response.json({
      ...shipped,
      emailed: false,
      emailError: (error as Error).message,
    });
  }
}
