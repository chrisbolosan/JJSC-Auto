import { getAllWarehouse } from "@/server/services/inventory.service";

//Get specific attributes from orders table for shipping client page
//  request /api/shipping
export async function GET() {
  try {
    const first = await getAllWarehouse();

    return Response.json(first);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}