//catalog api here
import { supabaseAdmin } from '../db/supabase';
import { getAllParts } from '../db/legacy';

//https://supabase.com/docs/reference/javascript/initializing
//parts form legacy, inventory and categories our DB
export async function getAllProducts() {
  const parts = await getAllParts();

  const { data: stock, error } = await supabaseAdmin
    .from('inventory')
    .select('part_number, quantity');

  if (error) {
    throw new Error(`db error: ${error.message}`);
  }

  const { data: categories, error: categoryError } = await supabaseAdmin
    .from('part_categories')
    .select('part_number, category');

  if (categoryError) {
    throw new Error(`db error: ${categoryError.message}`);
  }

  return parts.map((part) => {
    const stockRow = stock.find((s) => s.part_number === part.number);
    const categoryRow = categories.find((c) => c.part_number === part.number);

    return {
      ...part,
      quantity: stockRow ? stockRow.quantity : 0,
      category: categoryRow ? categoryRow.category : 'Other',
    };
  });
}
