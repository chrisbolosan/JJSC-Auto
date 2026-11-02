import { getAllShipping } from '@/server/services/admin.service';

//  GET request /api/allshipping
export async function GET() {
  try {
    const brackets = await getAllShipping();

    return Response.json(brackets);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
