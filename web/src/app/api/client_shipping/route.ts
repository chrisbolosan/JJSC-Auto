import { getAllShipping } from '@/server/services/shipping.service';

//Get specific attributes from orders table for shipping client page
//  request /api/shipping
export async function GET() {
  try {
    const first = await getAllShipping();

    return Response.json(first);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}