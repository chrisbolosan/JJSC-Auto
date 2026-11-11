import { getAllOrders } from "@/server/services/admin.service";

//Get specific attributes from orders table for shipping client page
//  request /api/shipping
export async function GET() {
  try {
    const first = await getAllOrders();

    return Response.json(first);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}