import { getWarehouseOrders } from '@/server/services/warehouse.service';

// GET /api/warehouse/orders               -> orders waiting to be packed
// GET /api/warehouse/orders?status=shipped -> recently shipped orders
export async function GET(request: Request) {
  const status =
    new URL(request.url).searchParams.get('status') === 'shipped'
      ? 'shipped'
      : 'authorized';

  try {
    const orders = await getWarehouseOrders(status);
    return Response.json(orders);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
