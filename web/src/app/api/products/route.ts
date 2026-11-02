import { getAllProducts } from '@/server/services/catalog.service';

//  GET request /api/allproducts, returns every product with current details and inventory
export async function GET() {
  try {
    const products = await getAllProducts();

    return Response.json(products);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
