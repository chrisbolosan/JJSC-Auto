//catalog api here
import { supabaseAdmin } from '../db/supabase';
import { getAllParts } from '../db/legacy';

//https://supabase.com/docs/reference/javascript/initializing
//parts form legacy, inventory our DB
export async function getAllProducts() {
  const parts = await getAllParts();

  const { data: stock, error } = await supabaseAdmin
    .from('inventory')
    .select('part_number, quantity');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  return parts.map((part) => ({
    ...part,
    quantity: stock.find((s) => s.part_number === part.number)?.quantity ?? 0,
  }));
}

export type Product = Awaited<ReturnType<typeof getAllProducts>>[number];
