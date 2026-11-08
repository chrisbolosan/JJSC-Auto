import { getOrderById } from '@/server/services/orderDetails.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return Response.json(
      { error: 'order entered must be a number' },
      { status: 400 },
    );
  }

  try {
    const order = await getOrderById(orderId);

    if (!order) {
      return Response.json({ error: 'order not found' }, { status: 404 });
    }

    console.log('order route get order by id', order);
    return Response.json(order);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
